import TaskListComponent from "../view/list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskBoard-component.js";
import DeleteButtonComponent from "../view/deleteButton-component.js";
import EmptyTaskComponent from "../view/emptyTask-component.js";
import { render } from "../framework/render.js";
import { Status, UserAction } from "../const.js";
import LoadingViewComponent from "../view/loadingView-component.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    #loadingComponent = new LoadingViewComponent();
    #deleteButtonComponent = null;

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
    }

    async init() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        const container = this.#boardContainer.querySelector('.container');
        render(this.#loadingComponent, container);
        await this.#tasksModel.init();
        container.innerHTML = '';
        this.#renderBoard();
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    async createTask() {
        const taskTitle = document.querySelector('.input').value.trim();

        if (!taskTitle) {
            return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.input').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи: ', err);
        }
    }

    #handleTrashClear = () => {
        this.#handleClearTrashClick();
    }

    async #handleClearTrashClick() {
        try {
            await this.#tasksModel.clearTrashTasks();
        } catch (err) {
            console.error('Ошибка при очистке корзины: ', err);
        }
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderTasksList(status) {
        const listComponent = new TaskListComponent({ status: status, onTaskDrop: this.#handleTaskDrop.bind(this) });
        render(listComponent, this.#tasksBoardComponent.element);
        const taskListElement = listComponent.element.querySelector('.list');
        const filteredTasks = this.tasks.filter(task => task.status === status);

        if (filteredTasks.length === 0) {
            render(new EmptyTaskComponent(), taskListElement);
        } else {
            filteredTasks.forEach(task => this.#renderTask(task, taskListElement));
        }

        if (status === Status.TRASH) {
            this.#deleteButtonComponent = new DeleteButtonComponent(Status.TRASH, {
                onClick: this.#handleTrashClear
            });

            render(this.#deleteButtonComponent, taskListElement.parentElement);
            this.updateDeleteButtonState();
        }
    }

    #renderBoard() {
        const statusLabels = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.TRASH];
        statusLabels.forEach(status => this.#renderTasksList(status));
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    async #handleTaskDrop(taskId, newStatus, afterTaskId) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus, afterTaskId);
        } catch (err) {
            console.error("Ошибка при обновлении статуса задачи: ", err);
        }
    }

    updateDeleteButtonState() {
        if (this.#deleteButtonComponent) {
            this.#deleteButtonComponent.toggleDisabled(!this.#tasksModel.hasTrashTasks());
        }
    }    

    #handleModelEvent(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                this.updateDeleteButtonState();
                break;
        }
    }
}
