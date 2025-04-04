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
    constructor(status) {
        super();
        this.status = status;
    }

    get template() {
        return createDeleteButtonComponentTemplate(this.status);
    }
}