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
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderEmptyTask(container) {
        render(new EmptyTaskComponent(), container);
    }

    #renderTrashList(taskListElement) {
        const trashTasks = this.#boardTasks.filter(task => task.status === Status.TRASH);
        
        if (trashTasks.length === 0) {
            this.#renderEmptyTask(taskListElement);
        } else {
            trashTasks.forEach(task => this.#renderTask(task, taskListElement));
        }
        render(new DeleteButtonComponent(Status.TRASH), taskListElement.parentElement);
    }

    #renderTasksList(status) {
        const listComponent = new TaskListComponent(status);
        render(listComponent, this.#tasksBoardComponent.element);

        const taskListElement = listComponent.element.querySelector('.list');

        if (status === Status.TRASH) {
            this.#renderTrashList(taskListElement);
        } else {
            const filteredTasks = this.#boardTasks.filter(task => task.status === status);
            if (filteredTasks.length === 0) {
                this.#renderEmptyTask(taskListElement);
            } else {
                filteredTasks.forEach(task => this.#renderTask(task, taskListElement));
            }
        }
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);

        const statusLabels = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.TRASH];

        statusLabels.forEach(status => this.#renderTasksList(status));
    }
}
