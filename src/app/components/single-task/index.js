import {View} from "./mvc/view";

export default function SingleTask(data, type) {
    const view = new View(data, type);

    return view.render();
}
