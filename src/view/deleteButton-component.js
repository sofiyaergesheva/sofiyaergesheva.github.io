import { createElement } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createDeleteButtonComponentTemplate(status) {
    const title = StatusLabel[status];

    return (
        `<section>
            <button class="task__delete" type="button">Удалить</button>
        </section>`
    );
}

export default class DeleteButtonComponent extends AbstractComponent {
    #handleClick = null;

     constructor(status, { onClick }) {
        super();
        this.status = status;
        this.#handleClick = onClick;
        this.element.querySelector('.task__delete').addEventListener('click', this.#clickHandler);
    }

    get template() {
        return createDeleteButtonComponentTemplate(this.status);
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}