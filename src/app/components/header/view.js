import Template from "./template/template.hbs";
import "./template/helpers";

export function MainHeader(data) {
    const mainHeader = document.getElementById("main-header");

    //mainHeader.innerHTML = Template(data);
}

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

