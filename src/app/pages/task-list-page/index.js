import {View} from "./mvc/view";
import Firebase from "../../services/firebase";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker";
import "webpack-jquery-ui/css";
import "jquery-ui/themes/base/base.css";


/**
 * @module TaskList
 * @description Renders the task list page template
 * */
export default function TaskList() {
    Firebase.getData().then((data) => {
        const view = new View(data);

        view.render();

        $( function() {
            $("[data-name=deadline]").datepicker({
                dateFormat: "MM d, yy",
                minDate: new Date()
            });
        });
    });
}
