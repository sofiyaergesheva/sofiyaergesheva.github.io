import { AbstractComponent } from "../framework/view/abstract-component.js";

function createDeleteButtonComponentTemplate() {
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
        return createDeleteButtonComponentTemplate();
    }

    toggleDisabled(isDisabled) {
        const button = this.element.querySelector('.task__delete');
        if (button) {
          button.disabled = isDisabled;
        }
      }
      
    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}