import { createElement } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";

function createListComponentTemplate(status) {
    const title = StatusLabel[status];

    return (
        `<section>
            <h3 class="title__item title title--${status}">${title}</h3>
            <ul class="list"></ul>
            ${status === Status.TRASH ? '<button class="task__delete" type="button">Удалить</button>' : ''}
        </section>`
    );
}

export default class TasksListComponent {
    constructor(status) {
        this.status = status;
        this.element = null;
    }
    getTemplate() {
        return createListComponentTemplate(this.status);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}