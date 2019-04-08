import Template from "./template/template.hbs";
import {EventBus} from "../../services/eventBus";

/**
 * @module Notification
 */

/**
 * A factory that returns an object to work with notifications
 * @return {object} Object with showMessage method
 */
export default function () {
    return {
        showMessage: function (type, message) {
            const root = document.getElementById("root");
            const notification = document.getElementById("notification");

            if(notification) notification.remove();

            root.innerHTML += Template({type: type, message: message});

            EventBus.dispatch("HangTabs");
        }
    };
}
