import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    const { id, title, status } = task;
    return (
        `<div class="taskboard__item task task--${status}" data-task-id="${id}">
       <div class="task__body">
       <p class="task--view">${title}</p>
       <input type="text" class="task--input" style="display: none;"/>
       </div>
       <button aria-label="Изменить" class="task__edit" type="button" style="display: none;"></button>
       </div>`
    );
}

export default class TaskComponent extends AbstractComponent {

    constructor({ task }) {
        super();
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
        this.element.setAttribute('draggable', true);
    
        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.task.id);
        });   
    }   
}