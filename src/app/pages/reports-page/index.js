import {View} from "./mvc/view";
import Firebase from "../../services/firebase";

export default function Report() {
    Firebase.getData().then((data) => {
        const view = new View(data);

        view.render();
    });
}
