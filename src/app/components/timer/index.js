import {View} from "./mvc/view";

/**
 * @module TimerComponent
 * @description Render timer template
 * @param {object} data - task data object
 */
export default function Timer(data) {
    let view = new View(data);

    view.render();
}
