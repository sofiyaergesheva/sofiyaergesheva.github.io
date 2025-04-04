import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

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

export default class TaskAdditionComponent extends AbstractComponent {
    get template() {
        return createTaskAdditionComponentTemplate();
    }
}