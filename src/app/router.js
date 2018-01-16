"use strict";

import {EventBus} from "./services/eventBus";
import MainHeader from "./components/header/index";
import Report from "./pages/reports-page/index";
import Timer from "./pages/timer-page/index";
import Settings from "./pages/settings-page/index";
import TaskList from "./pages/task-list-page/index";

/**
 * @module Router
 * */
export class Router {
    /**
   * Sets the default routes and the root route
   * */
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

    /**
     * Adds a new route
     * @param {string} path - route path
     * @param {object} component - route component
     * */
    add(path, component) {
        this.routes[path] = component;
        this.init();
    }

    /**
   * Removes an existing route
   * @param {string} path - route path
   * */
    remove(path) {
        delete this.routes[path];
        this.init();
    }

    /**
     * Changes the root route
     * @param {string} path - route path
     * */
    changeRootPath(path) {
        this.root = path;
    }

    /**
     * Event handler that fires when the url hash is changed
     * */
    pageChange() {
        let hash = window.location.hash;

        if (window.location.pathname == "/" && hash == "") hash = this.root;

        MainHeader({hash: hash.substring(1)});

        EventBus.dispatch(hash);
    }

    /**
     * Adds routes to the EventBus and show the default page
     * */
    init() {
        for (let key in this.routes) {
            EventBus.add(key, this.routes[key]);
        }
        this.pageChange();
    }
}
