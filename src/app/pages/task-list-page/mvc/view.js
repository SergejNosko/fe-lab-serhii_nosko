import {Controller} from './controller';
import Template from '../template/template.hbs';
import GlobalList from '../template/global-list.hbs';
import FirstEntranceTemplate from '../template/first-entrance-template.hbs';
import ZeroTasks from '../template/zero-tasks.hbs';
import PushFirstTask from '../template/push-first-task.hbs';
import '../template/helpers';
import SingleTask from '../../../components/single-task/index';
import {EventBus} from "../../../services/eventBus";
import uuid from 'uuid/v1';
import Notification from '../../../components/notifications/index';

export class View {
    constructor(data) {
        this.controller = new Controller(data);

        document.body.addEventListener('click', this.clickHandler.bind(this));
        EventBus.add('stateChange', this.render, this);
    }

    handleSubmit(e) {
        let target = e.target;

        if (target.dataset.query == 'addTask') {

            let newTask = {
                id: uuid(),
                title: document.querySelector('#add-modal [data-name=title]').value,
                description: document.querySelector('#add-modal [data-name=description]').value,
                createdDate: Date.now(),
                startDate: null,
                deadline: Date.parse(document.querySelector('#add-modal [data-name=deadline]').value),
                isActive: null,
                categoryId: document.querySelector('#add-modal [name=category]:checked').value,
                estimationTotal: document.querySelectorAll('.radio-block__radio_filled').length - 3,
                estimationUsed: 0,
                priority: document.querySelector('#add-modal [name=priority]:checked').value
            };
            this.controller.sendData(newTask);
            this.render(this.controller.receiveData());
        }
    }

    showModal(query) {
        const modalsArticle = document.getElementById('modals-article');
        switch (query) {
            case 'add': {
                const currentModal = document.getElementById('add-modal');

                modalsArticle.style.display = 'flex';
                currentModal.classList.add('modal-window__active');

                document.querySelector('.modals-article').addEventListener('click', this.handleSubmit.bind(this));
                break;
            }
            case 'close': {
                document.querySelector('.modals-article').removeEventListener('click', this.handleSubmit);
                arguments[1].style.display = 'none';
                modalsArticle.style.display = 'none';
                break;
            }
        }
    }

    estimationButtons(target) {
        const siblings = target.parentElement.children;
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove('radio-block__radio_filled');
        }
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.add('radio-block__radio_filled');
            if (siblings[i] === target) break;
        }
    }

    showGlobalList(target) {
        const container = target.parentElement,
            siblings = container.parentElement.parentElement.children;

        if (target.classList.contains('tabs__tab-link_global-active')) {
            container.nextElementSibling.style.display = 'none';

            for (let i = 0; i < siblings.length; i++) {
                if (siblings[i].classList.contains('tasks-section')) {
                    siblings[i].style.display = 'none';
                }
            }
        }
        else {
            container.nextElementSibling.style.display = 'block';

            for (let i = 0; i < siblings.length; i++) {
                if (siblings[i].classList.contains('tasks-section')) {
                    siblings[i].style.display = 'block';
                }
            }
        }

        target.classList.toggle('tabs__tab-link_global-active');
    }

    showRemove() {
        let tasks = document.querySelectorAll('.single-task');

        if (tasks[0].classList.contains('single-task_removed')) {
            if(this.controller.getRemovedTasksLength() !== 0) {
                const currentModal = document.getElementById('remove-modal');
                const modalsArticle = document.getElementById('modals-article');

                modalsArticle.style.display = 'flex';
                currentModal.classList.add('modal-window__active');
            }
        }
        else {
            const tabs = document.getElementById('tabs'),
                filters = document.getElementById('filters');

            let newTabs = `<div class="tabs__container">
                                    <a href="#" class="tabs__tab-link" data-query="select" data-select="select">Select All</a>
                                    <a href="#" class="tabs__tab-link" data-query="select" data-select="deselect">Deselect All</a>
                                  </div>`;
            tabs.classList.add('tabs_extended');
            tabs.insertAdjacentHTML('afterBegin', newTabs);

            newTabs = `<nav class="task-article__navigation tabs tabs_extended"> ${newTabs} </nav>`;
            filters.insertAdjacentHTML('afterEnd', newTabs);

            for (let i = 0; i < tasks.length; i++) {
                tasks[i].classList.add('single-task_removed');
            }
        }
    }

    findList(target) {
        let parent = target.parentElement;
        while (parent.classList.contains('main-content__article') === false) {
            parent = parent.parentElement;
        }

        return parent.querySelectorAll('ul');
    }

    clickHandler(e) {
        const target = e.target;

        let query = target.dataset.query,
            sortPriority = target.dataset.priority,
            sortIsActive = target.dataset.isActive;

        if (query) {
            switch (query) {
                case 'global': {
                    e.preventDefault();
                    this.showGlobalList(target);
                    break;
                }
                case 'closeNote': {
                    target.parentElement.offsetHeight;
                    target.parentElement.style.animation = 'hide .1s ease';
                    break;
                }
                case 'estimation': {
                    this.estimationButtons(target);
                    break;
                }
                case 'close': {
                    let parentModal = target.closest('.modal-window');
                    this.showModal(query, parentModal);
                    break;
                }
                case 'addTask': {
                    e.preventDefault();
                    this.showModal(query);
                    break;
                }
                case 'remove': {
                    this.showRemove();
                    break;
                }
                case 'submitRemove': {
                    this.controller.sendRemoveRequest();
                    this.render();
                    this.showRemove();
                    break;
                }
                case 'skip': {
                    sessionStorage.setItem('isNewUser', false);
                    this.render({isActive: null});
                    break;
                }
                case 'select': {
                    e.preventDefault();
                    let lists = this.findList(target);
                    for (let i = 0; i < lists.length; i++) {
                        let children = lists[i].children;
                        for (let j = 0; j < children.length; j++) {
                            if (target.dataset.select === 'select') {
                                if (children[j].classList.contains('single-task__remove-button_active') === false) {
                                    children[j].children[0].classList.add('single-task__remove-button_active');
                                    this.controller.setRemovedTask(+children[j].dataset.id, 'select');
                                }
                            }
                            else {
                                if (children[j].classList.contains('single-task__remove-button_active') === false) {
                                    children[j].children[0].classList.remove('single-task__remove-button_active');
                                    this.controller.setRemovedTask(+children[j].dataset.id, 'deselect');
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

        if (sortPriority) {
            e.preventDefault();
            this.render(null, sortPriority);
        }

        if (sortIsActive) {
            e.preventDefault();
            sortIsActive = sortIsActive == 'false' ? false : null;

            this.render(null, 0, sortIsActive);
        }
    }

    renderGlobalList(sortedData, activeLinkNumber) {
        const globalList = document.getElementById('global-list');

        let currentCategory,
            section,
            list;

        globalList.innerHTML = GlobalList();
        globalList.querySelector(`[data-priority="${activeLinkNumber}"]`).classList.add('tabs__tab-link_active');

        sortedData.forEach((task, i) => {
            if (currentCategory === undefined || currentCategory !== task.categoryId) {
                section = document.createElement('section');
                list = document.createElement('ul');
                currentCategory = task.categoryId;

                section.className = `previous-tasks__section tasks-section tasks-section_${task.categoryId}`;
                list.classList.add('tasks-section__list');

                section.innerHTML += `<h2 class="tasks-section__title"><span class="tasks-section__radio"></span>${task.categoryId}</h2>`;
                section.appendChild(list);
                list.innerHTML += SingleTask(task, 'global');
                globalList.appendChild(section);
            }
            else {
                list.innerHTML += SingleTask(task, 'global');
            }
        });

    }

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

        root.querySelector(`[data-is-active=${activePage}`).classList.add('tabs__tab-link_active');

        const todayTasksList = document.getElementById('task-list');

        /*---------------Get tasks for today-------------------------------*/

        let todaysData = this.controller.receiveData({isActive: activePage, startDate: true});


        if(todaysData.length === 0) todayTasksList.innerHTML = PushFirstTask();
        else{
            todaysData.forEach((task) => {
                todayTasksList.innerHTML += SingleTask(task, 'today');
            });
        }

        /*-------------------Get other tasks--------------------------------------*/

        let globalDataObj = {
            startDate: null,
            isActive: activePage
        };

        if(activeFilter != 0){
            globalDataObj.priority = activeFilter
        }

        let sortedData = this.controller.receiveData(globalDataObj).sort((curr, next) => {
            return curr.categoryId > next.categoryId ? 1 : 0;
        });

        this.renderGlobalList(sortedData, activeFilter);
    }

    render(data, isFilter, page) {
        const root = document.getElementById('root');
        let isNewUser = sessionStorage.getItem('isNewUser');
        if(!isNewUser){
            root.innerHTML = FirstEntranceTemplate();
        }
        else {
            this.renderTaskList(root, data, isFilter, page);
        }
    }
}
