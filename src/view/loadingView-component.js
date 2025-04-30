import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskTemplate() {
    return `
        <div class="loading-wrapper">
            <img src="/img/spinnercat1.png" alt="Loading..." class="loading-image" />
        </div>
    `;
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createNoTaskTemplate();
    }
}