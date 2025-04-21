import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyTaskTemplate() {
    return `<li class="task task--empty">Перетащите карточку</li>`;
}

export default class EmptyTaskComponent extends AbstractComponent {
    constructor() {
        super();
    }

    get template() {
        return createEmptyTaskTemplate();
    }
}
