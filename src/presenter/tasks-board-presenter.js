import TaskListComponent from "../view/list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskBoard-component.js";
import DeleteButtonComponent from "../view/deleteButton-component.js";
import { render } from "../framework/render.js";
import { Status } from "../const.js";


export default class TasksBoardPresenter {
    tasksBoardComponent = new TaskBoardComponent();
    tasksListComponent = new TaskListComponent();

    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();

    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];
        
        render(this.#tasksBoardComponent, this.#boardContainer);

        const statusLabels = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.TRASH];

        statusLabels.forEach(status => {
            const listComponent = new TaskListComponent(status);
            render(listComponent, this.#tasksBoardComponent.getElement());

            const taskListElement = listComponent.getElement().querySelector('.list');

            const filteredTasks = this.#boardTasks.filter(task => task.status === status);

            filteredTasks.forEach(task => {
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, taskListElement);
            });
            if (status === Status.TRASH) render(new DeleteButtonComponent(status), taskListElement);
        }); 
    }
}