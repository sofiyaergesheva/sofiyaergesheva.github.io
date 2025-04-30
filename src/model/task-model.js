import { generateID } from "../utils.js";
import Observable from "../framework/observable.js";
import { UpdateType, UserAction } from "../const.js";

export default class TasksModel extends Observable {
    #boardtasks = [];
    #tasksApiService = null;

    constructor({ tasksApiService }) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks;
        } catch (err) {
            this.#boardtasks = [];
        }
        this._notify(UpdateType.INIT);
    }

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status).sort((a, b) => a.order - b.order);;
    }

    async addTask(title) {
        const newTask = {
            title,
            status: "backlog",
            id: generateID()
        };

        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер: ', err);
            throw err;
        }
    }

    deleteTask(taskId) {
        this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
        this._notify(UserAction.DELETE_TASK, { id: taskId });
    }

    async clearTrashTasks() {
        const trashTasks = this.#boardtasks.filter(task => task.status === 'trash');
        try {
            await Promise.all(trashTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
            this._notify(UserAction.DELETE_TASK, { status: 'trash' });
        } catch (err) {
            console.error("Ошибка при удалении задач из корзины на сервере: ", err);
            throw err;
        }
    }

    hasTrashTasks() {
        return this.#boardtasks.some(task => task.status === 'trash');
    }

    async updateTaskStatus(taskId, newStatus, afterTaskId = null) {
        const index = this.#boardtasks.findIndex(task => task.id === taskId);
        if (index === -1) return;

        const [task] = this.#boardtasks.splice(index, 1);
        const previousStatus = task.status;
        task.status = newStatus;

        const afterIndex = afterTaskId ? this.#boardtasks.findIndex(task => task.id === afterTaskId) : -1;
        const insertIndex = afterIndex !== -1 ? afterIndex : this.#boardtasks.length;
        this.#boardtasks.splice(insertIndex, 0, task);

        this._notify(UserAction.UPDATE_TASK, { task, previousStatus });
        try {
            const updatedTask = await this.#tasksApiService.updateTask(task);
            Object.assign(task, updatedTask);
        } catch (err) {
            console.error("Ошибка при обновлении статуса задачи на сервере: ", err);
            task.status = previousStatus;
            this._notify(UserAction.UPDATE_TASK, { task, previousStatus });
            throw err;
        }
    }
}
