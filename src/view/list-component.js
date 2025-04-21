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
    constructor({status, onTaskDrop}) {
        super();
        this.status = status;
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        return createListComponentTemplate(this.status);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;
    
        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        
            const dragging = document.querySelector('.dragging');
            if (!dragging) return;
        
            const afterElement = this.#getDragAfterElement(container, event.clientY);
            if (afterElement === dragging.nextSibling) return;
        
            container.insertBefore(dragging, afterElement || null);
        });
        
        container.addEventListener('drop', (event) => {
            event.preventDefault();

            const taskId = event.dataTransfer.getData('text/plain');
            const afterElement = this.#getDragAfterElement(container, event.clientY);
            const afterId = afterElement ? afterElement.dataset.taskId : null;
    
            onTaskDrop(taskId, this.status, afterId);
        });
    }    
    
    #getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
    
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
    }              
}