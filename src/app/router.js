"use strict";

import {EventBus} from "./services/eventBus";
import MainHeader from "./components/header/index";
import Report from "./pages/reports-page/index";
import Timer from "./pages/timer-page/index";
import Settings from "./pages/settings-page/index";
import TaskList from "./pages/task-list-page/index";

class Router {
    constructor() {
        if (Router.instance) {
            return Router.instance;
        }

        this.routes = {
            "#timer": Timer,
            "#task-list": TaskList,
            "#settings": Settings,
            "#report": Report
        };

        this.root = "#task-list";

        window.addEventListener("hashchange", this.pageChange);

        Router.instance = this;
    }

    add(path, component) {
        this.routes[path] = component;
        this.init();
    }

    remove(path) {
        delete this.routes[path];
        this.init();
    }

    changeRootPath(path) {
        this.root = path;
    }

    pageChange() {
        let hash = window.location.hash;

        if (window.location.pathname == "/" && hash == "") hash = this.root;

        MainHeader({hash: hash.substring(1)});

        EventBus.dispatch(hash);
    }

    init() {
        for (let key in this.routes) {
            EventBus.add(key, this.routes[key]);
        }
        this.pageChange();
    }
}

let router = new Router();

router.init();
