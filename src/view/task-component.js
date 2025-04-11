import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    const { title, status } = task;
    return (
        `<div class="taskboard__item task task--${status}">
       <div class="task__body">
       <p class="task--view">${title}</p>
       <input type="text" class="task--input" style="display: none;"/>
       </div>
       <button aria-label="Изменить" class="task__edit" type="button" style="display: none;"></button>
       </div>`
    );
}

export default class TaskComponent extends AbstractComponent {

    constructor({ task }) {
        super();
        this.task = task;
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }
}