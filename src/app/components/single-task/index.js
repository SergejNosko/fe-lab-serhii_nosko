import {View} from "./mvc/view";

/**
 *@module SingleTask
 * @description Render task template
 * @return {string} Task template
 */

export default function SingleTask(data, type) {
    const view = new View(data, type);

    return view.render();
}
