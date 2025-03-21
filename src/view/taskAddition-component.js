import { createElement } from "../framework/render.js";

function createTaskAdditionComponentTemplate() {
    return (
        `<div class="image-and-form">
                <img class="img" src="img/cat.png" alt="cat">

                <form class="form" action="">
                    <h3>Новая задача</h3>
                    <input type="text" class="input" placeholder="Название задачи...">
                    <button class="button">+ Добавить</button>
                </form>
            </div>`
    );
}

export default class TaskAdditionComponent {
    getTemplate() {
        return createTaskAdditionComponentTemplate();
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