import { createElement } from "../framework/render.js";

function createListComponentTemplate() {
    return (
        `<ul class="list">
            <h3 class="title">Название блока</h3>
        </ul>`
    );
}

export default class ListComponent {
    getTemplate() {
        return createListComponentTemplate();
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