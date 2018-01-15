import Template from "./template/template.hbs";
import Controller from "./settings-controller";
import Firebase from "../../services/firebase";
import $ from "jquery";


/**
 * @module SettingsPageView
 * @description Renders setting page template
 * */
export function View() {
    const root = document.getElementById("root");
    let isNewUser = sessionStorage.getItem("isNewUser");

    root.innerHTML = Template();

    if(!isNewUser) Controller();
    else{
        Firebase.getData("settings").then((data) => {
            Controller(data);

            $("a").tooltip();
        });
    }
}
