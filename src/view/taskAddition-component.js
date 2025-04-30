import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskAdditionComponentTemplate() {
    return (
        `<div class="image-and-form">
                <img class="img" src="img/cat.png" alt="cat">

                <form class="form" action="">
                    <h3>Новая задача</h3>
                    <input type="text" class="input" placeholder="Название задачи...">
                    <button class="button" type='submit'>+ Добавить</button>
                </form>
            </div>`
    );
}

export default class TaskAdditionComponent extends AbstractComponent {

    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }

    get template() {
        return createTaskAdditionComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}