import TaskListComponent from "../view/list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskBoard-component.js";
import DeleteButtonComponent from "../view/deleteButton-component.js";
import EmptyTaskComponent from "../view/emptyTask-component.js";
import { render } from "../framework/render.js";
import { Status } from "../const.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    createTask() {
        const taskTitle = document.querySelector('.input').value.trim();
       
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.input').value = '';
    }

    #handleTrashClear = () => {
        this.deleteTrashTasks();
    }
    
    deleteTrashTasks() {
        this.#tasksModel.clearTrash();
    }
    

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderTasksList(status) {
        const listComponent = new TaskListComponent({status: status, onTaskDrop: this.#handleTaskDrop.bind(this)});
        render(listComponent, this.#tasksBoardComponent.element);
        const taskListElement = listComponent.element.querySelector('.list');
        const filteredTasks = this.tasks.filter(task => task.status === status);
    
        if (filteredTasks.length === 0) {
            render(new EmptyTaskComponent(), taskListElement);
        } else {
            filteredTasks.forEach(task => this.#renderTask(task, taskListElement));
        }
    
        if (status === Status.TRASH) {
            render(new DeleteButtonComponent(Status.TRASH, { onClick: this.#handleTrashClear }), taskListElement.parentElement);
        }        
    }
    
    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        const statusLabels = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.TRASH];
        statusLabels.forEach(status => this.#renderTasksList(status));
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #handleTaskDrop(taskId, newStatus, afterTaskId) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus, afterTaskId);
    }       
}
