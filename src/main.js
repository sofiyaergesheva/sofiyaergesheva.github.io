import HeaderComponent from "./view/header-component.js";
import TaskAdditionComponent from "./view/taskAddition-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksModel from "./model/task-model.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const boardContainer = document.querySelector('.taskboard');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: boardContainer,
    tasksModel,
});

const formAddTaskComponent = new TaskAdditionComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    tasksBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);

tasksBoardPresenter.init();
