import Template from "./template/template.hbs";

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

            root.innerHTML += Template({type: type, message: message});
        }
    };
}
