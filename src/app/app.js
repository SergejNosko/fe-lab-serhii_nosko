/*import $ from "jquery";

window.$ = $;*/

require("./router");
import {Router} from "./router";

let router = new Router();

router.init();

require("../assets/less/main.less");


