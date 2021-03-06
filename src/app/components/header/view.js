import Template from "./template/template.hbs";
import "./template/helpers";

/**
 * @module Header
 */

/**
 *Render the header template
 * @param {object} data - Object with hash property
 */
export function MainHeader(data) {
    const mainHeader = document.getElementById("main-header");

    mainHeader.innerHTML = Template(data);

    let hash = window.location.hash;

    if(hash === "") {
        const tabs = document.querySelector("[data-query='select']");

        if(tabs){
            let removeButton = document.querySelector("[data-hash='#remove']");

            removeButton.classList.add("main-header__link_active");
        }
        else {
            hash = "#task-list";
        }
    }
    const targetItem = document.querySelector(`[data-hash='${hash}']`);

    if(targetItem) targetItem.classList.add("main-header__link_active");
}

/**
 * Does the function call delay
 * @param {function} func - function to do a delay on
 * @param {number} limit - frequency of function call in ms
 */
const throttle = function(func, limit) {
    let inThrottle = undefined;
    return function() {
        const args = arguments,
            context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            return setTimeout(function() {
                return inThrottle = false;
            }, limit);
        }
    };
};

const header = document.querySelector(".main-header");

window.addEventListener("scroll", throttle(function() {
    let headerHeight = header.clientHeight;
    if(window.pageYOffset >= headerHeight){
        header.classList.add("main-header_fixed");
    }
    else{
        header.classList.remove("main-header_fixed");
    }
}, 50));

