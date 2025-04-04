import { createElement } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";

function createDeleteButtonComponentTemplate(status) {
    const title = StatusLabel[status];

    return (
        `<section>
            <button class="task__delete" type="button">Удалить</button>
        </section>`
    );
}

export default class DeleteButtonComponent {
    constructor(status) {
        this.status = status;
        this.element = null;
    }

    getTemplate() {
        return createDeleteButtonComponentTemplate(this.status);
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