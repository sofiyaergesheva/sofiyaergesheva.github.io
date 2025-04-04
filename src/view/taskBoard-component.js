import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskBoardComponentTemplate() {
    return (
        `<div class="container"></div>`
    );
}

export default class TaskBoardComponent extends AbstractComponent {
    get template() {
        return createTaskBoardComponentTemplate();
    }
}