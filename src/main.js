import HeaderComponent from "./view/header-component.js";
import TaskAdditionComponent from "./view/taskAddition-component.js";
import TaskBoardComponent from "./view/taskBoard-component.js";
import ListComponent from "./view/list-component.js";
import TaskComponent from "./view/task.component.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const boardContainer = document.querySelector('.taskboard');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new TaskAdditionComponent(), formContainer);

const boardComponent = new TaskBoardComponent();
render(boardComponent, boardContainer);

const boardElement = boardComponent.getElement();

for (let i = 0; i < 4; i++) {
    const listComponent = new ListComponent();
    render(listComponent, boardElement);

    const listElement = listComponent.getElement();

    for (let j = 0; j < 3; j++) {
        render(new TaskComponent(), listElement);
    }
}
