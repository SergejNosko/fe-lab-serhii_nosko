import {View} from "./mvc/view";
import Firebase from "../../services/firebase";

/**
 * @module TaskList
 * @description Renders the task list page template
 * */
export default function TaskList() {
    Firebase.getData().then((data) => {
        const view = new View(data);

        view.render();
    });
}
