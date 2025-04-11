import { createElement } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createListComponentTemplate(status) {
    const title = StatusLabel[status];

    return (
        `<section>
            <h3 class="title__item title title--${status}">${title}</h3>
            <ul class="list"></ul>
        </section>`
    );
}

export default class TasksListComponent extends AbstractComponent {
    constructor(status) {
        super();
        this.status = status;
    }

    get template() {
        return createListComponentTemplate(this.status);
    }
}