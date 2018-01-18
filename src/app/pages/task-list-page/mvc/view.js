import {Controller} from "./controller";
import Template from "../template/template.hbs";
import GlobalList from "../template/global-list.hbs";
import FirstEntranceTemplate from "../template/first-entrance-template.hbs";
import ZeroTasks from "../template/zero-tasks.hbs";
import PushFirstTask from "../template/push-first-task.hbs";
import "../template/helpers";
import "../../../services/tabPlugin";
import "../../../services/tooltipPlugin";
import SingleTask from "../../../components/single-task/index";
import {EventBus} from "../../../services/eventBus";
import Notification from "../../../components/notifications/index";
import uuid from "uuid/v1";
import $ from "jquery";

/**
 * @module TaskListView
 * */
export class View {
    /**
   * Initialize the controller field
   * @param {array} data - tasks array
   * */
    constructor(data) {
        this.controller = new Controller(data);

        document.body.addEventListener("click", this.clickHandler.bind(this));
        EventBus.add("stateChange", this.render, this);
    }

    /**
       * Collects data from the modal window, sends it to the controller and render a template again
     *
     * */
    handleSubmit(e) {
        let target = e.target;

        if (target.dataset.query === "addTask") {
            let title = document.querySelector("#add-modal [data-name=title]");
            let description = document.querySelector("#add-modal [data-name=description]");
            let deadline = document.querySelector("#add-modal [data-name=deadline]");
            let categoryId = document.querySelector("#add-modal [name=category]:checked");
            let priority = document.querySelector("#add-modal [name=priority]:checked");

            if(!title.value || !description.value || !deadline.value || !categoryId.value || !priority.value){
                Notification().showMessage("warning", "All fields must be filled in!");
                return;
            }


            let newTask = {
                id: uuid(),
                title: title.value,
                description: description.value,
                createdDate: Date.now(),
                startDate: null,
                deadline: Date.parse(deadline.value),
                isActive: null,
                categoryId: categoryId.value,
                estimationTotal: document.querySelectorAll(".radio-block__radio_filled").length - 3,
                estimationUsed: 0,
                priority: priority.value
            };
            this.controller.sendData(newTask);
            this.render(this.controller.receiveData());
        }
    }

    /**
     * Show or hide the modal window according to the passed parameter
       * @param {string} query - tells to the method to show or hide the modal window
     * */
    showModal(query) {
        const modalsArticle = document.getElementById("modals-article");
        const currentModal = document.getElementById("add-modal");

        switch (query) {
        case "add": {
            modalsArticle.style.display = "flex";
            currentModal.style.display = "flex";
            currentModal.classList.add("modal-window__active");

            document.querySelector(".modals-article").addEventListener("click", this.handleSubmit.bind(this));
            break;
        }
        case "close": {
            document.querySelector(".modals-article").removeEventListener("click", this.handleSubmit);
            currentModal.classList.remove("modal-window__active");
            currentModal.style.display = "none";
            modalsArticle.style.display = "none";
            break;
        }
        }
    }

    /**
     * Draws an estimation buttons in the modal window
     * @param {object} target - DOM element where the buttons will be drawn
     * */
    estimationButtons(target) {
        const siblings = target.parentElement.children;
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove("radio-block__radio_filled");
        }
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.add("radio-block__radio_filled");
            if (siblings[i] === target) break;
        }
    }

    /**
     * Renders the global list
     * @param {object} target - DOM element where the global list will be drawn
     * */
    showGlobalList(target) {
        const container = target.parentElement,
            siblings = container.parentElement.parentElement.children;

        if (target.classList.contains("tabs__tab-link_global-active")) {
            container.nextElementSibling.style.display = "none";

            for (let i = 0; i < siblings.length; i++) {
                if (siblings[i].classList.contains("tasks-section")) {
                    siblings[i].style.display = "none";
                }
            }
        }
        else {
            container.nextElementSibling.style.display = "block";

            for (let i = 0; i < siblings.length; i++) {
                if (siblings[i].classList.contains("tasks-section")) {
                    siblings[i].style.display = "block";
                }
            }
        }

        target.classList.toggle("tabs__tab-link_global-active");
    }

    /**
     * Shows the removing page or delete highlighted tasks if page is already shown
     * */
    showRemove() {
        let tasks = document.querySelectorAll(".single-task");

        if(tasks.length === 0) return;

        if (tasks[0].classList.contains("single-task_removed")) {
            if(this.controller.getRemovedTasksLength() !== 0) {
                const currentModal = document.getElementById("remove-modal");
                const modalsArticle = document.getElementById("modals-article");

                modalsArticle.style.display = "flex";
                currentModal.classList.add("modal-window__active");
            }
        }
        else {
            const tabs = document.getElementById("tabs"),
                filters = document.getElementById("filters");

            let newTabs = `<div class="tabs__container">
                                    <a href="#" class="tabs__tab-link" data-query="select" data-select="select">Select All</a>
                                    <a href="#" class="tabs__tab-link" data-query="select" data-select="deselect">Deselect All</a>
                                  </div>`;
            tabs.classList.add("tabs_extended");
            tabs.insertAdjacentHTML("afterBegin", newTabs);

            newTabs = `<nav class="task-article__navigation tabs tabs_extended"> ${newTabs} </nav>`;
            if(filters) {
                filters.insertAdjacentHTML("afterEnd", newTabs);
            }


            for (let i = 0; i < tasks.length; i++) {
                tasks[i].classList.add("single-task_removed");
            }
        }
    }

    /**
     * Finds an ul element
     * @param {object} target - DOM element where to find the ul
     * @return {object} found ul element
     * */
    findList(target) {
        let parent = target.parentElement;
        while (parent.classList.contains("main-content__article") === false) {
            parent = parent.parentElement;
        }

        return parent.querySelectorAll("ul");
    }

    /**
     * Event handler that fires when the user clicks on some elements on the page
     * */
    clickHandler(e) {
        const target = e.target;

        let query = target.dataset.query;

        if (query) {
            switch (query) {
            case "global": {
                e.preventDefault();
                this.showGlobalList(target);
                break;
            }
            case "closeNote": {
                target.parentElement.offsetHeight;
                target.parentElement.style.animation = "hide .1s ease";
                break;
            }
            case "estimation": {
                this.estimationButtons(target);
                break;
            }
            case "close": {
                let parentModal = target.closest(".modal-window");
                this.showModal(query, parentModal);
                break;
            }
            case "addTask": {
                e.preventDefault();
                this.showModal(query);
                break;
            }
            case "remove": {
                this.showRemove();
                break;
            }
            case "submitRemove": {
                this.controller.sendRemoveRequest();
                this.render();
                this.showRemove();
                break;
            }
            case "skip": {
                sessionStorage.setItem("isNewUser", false);
                this.render({isActive: null});
                break;
            }
            case "select": {
                e.preventDefault();
                let lists = this.findList(target);
                for (let i = 0; i < lists.length; i++) {
                    let children = lists[i].children;
                    for (let j = 0; j < children.length; j++) {
                        if (target.dataset.select === "select") {
                            if (children[j].classList.contains("single-task__remove-button_active") === false) {
                                children[j].children[0].classList.add("single-task__remove-button_active");
                                this.controller.setRemovedTask(+children[j].dataset.id, "select");
                            }
                        }
                        else {
                            if (children[j].classList.contains("single-task__remove-button_active") === false) {
                                children[j].children[0].classList.remove("single-task__remove-button_active");
                                this.controller.setRemovedTask(+children[j].dataset.id, "deselect");
                            }
                        }
                    }
                }
                break;
            }
            default: {
                this.showModal(query);
                break;
            }
            }
        }
    }

    /**
     * Renders the global task list
     * @param {array} sortedData - sorted tasks data array
     * @param {number} activeLinkNumber - a number of the current active link
     * */
    renderGlobalList(sortedData, activeLinkNumber) {
        const globalList = document.getElementById("global-list");

        let currentCategory,
            section,
            list;

        globalList.innerHTML = GlobalList();
        globalList.querySelector(`[data-priority="${activeLinkNumber}"]`).classList.add("tabs__tab-link_active");

        sortedData.forEach((task) => {
            if (currentCategory === undefined || currentCategory !== task.categoryId) {
                section = document.createElement("section");
                list = document.createElement("ul");
                currentCategory = task.categoryId;

                section.className = `previous-tasks__section tasks-section tasks-section_${task.categoryId}`;
                list.classList.add("tasks-section__list");

                section.innerHTML += `<h2 class="tasks-section__title"><span class="tasks-section__radio"></span>${task.categoryId}</h2>`;
                section.appendChild(list);
                list.innerHTML += SingleTask(task, "global");
                globalList.appendChild(section);
            }
            else {
                list.innerHTML += SingleTask(task, "global");
            }
        });

    }

    /**
     * Renders a list of the tasks that have not been completed
     * @param {object} root - DOM element with id 'root'
     * @param {array} data - tasks array
     * @param {string} isFilter - global list filter
     * @param {string} page - active page filter
     * */
    renderTaskList(root, data, isFilter, page){

        let currentData = data || this.controller.receiveData({isActive: null}),
            activeFilter = isFilter || 0,
            activePage = page === false ? false : null;

        /*----------------Start template rendering----------------------*/

        if(currentData.length === 0 && page !== false){
            root.innerHTML = ZeroTasks();
            return;
        }

        root.innerHTML = Template();

        root.querySelector(`[data-is-active=${activePage}`).classList.add("tabs__tab-link_active");

        const todayTasksList = document.getElementById("task-list");

        /*---------------Get tasks for today-------------------------------*/

        let todaysData = this.controller.receiveData({startDate: true, isActive: activePage});

        if(todaysData.length === 0) todayTasksList.innerHTML = PushFirstTask();
        else{
            todaysData.forEach((task) => {
                todayTasksList.innerHTML += SingleTask(task, "today");
            });
        }

        /*-------------------Get other tasks--------------------------------------*/

        if(activePage === false) return; //it's needed to not draw global list for the done tasks tab

        let globalDataObj = {
            startDate: null,
            isActive: activePage
        };

        if(activeFilter != 0){
            globalDataObj.priority = activeFilter;
        }

        let sortedData = this.controller.receiveData(globalDataObj).sort((curr, next) => {
            return curr.categoryId > next.categoryId ? 1 : 0;
        });

        this.renderGlobalList(sortedData, activeFilter);
    }

    /**
     * Renders the task list page template
     * @param {array} data - tasks data array
     * @param {string} isFilter - global list filter
     * @param {string} page - active page filter
     * */
    render(data, isFilter, page) {

        const root = document.getElementById("root");
        let isNewUser = sessionStorage.getItem("isNewUser");
        if(!isNewUser){
            root.innerHTML = FirstEntranceTemplate();
        }
        else {
            this.renderTaskList(root, data, isFilter, page);
        }

        $("a").tooltip();
        $("[data-priority]").customTab({self: this, params: [null], callback: this.render});
        $("[data-is-active]").customTab({self: this, params: [null, 0], callback: this.render});
    }
}
