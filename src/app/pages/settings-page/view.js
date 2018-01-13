import Template from "./template/template.hbs";
import Controller from "./controller";
import Firebase from "../../services/firebase";
//import TabPlugin from '../../services/tabPlugin';
import $ from "jquery";

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
