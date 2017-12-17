import {Controller} from './controller';
import Template from './template.hbs';
import GlobalList from './global-list.hbs';
import FirstEntranceTemplate from './first-entrance-template.hbs';
import './helpers';
import SingleTask from '../../components/single-task/index';
import {EventBus} from "../../services/eventBus";
import uuid from 'uuid/v1';

export class View{
    constructor(){
        this.controller = new Controller();

        document.body.addEventListener('click', this.clickHandler.bind(this));
        EventBus.add('stateChange', this.render, this);
    }

    handleSubmit(e){
        let target = e.target;

        if(target.dataset.query == 'addTask'){

            let newTask = {
                id: uuid(),
                title: document.querySelector('#add-modal [data-name=title]').value,
                description: document.querySelector('#add-modal [data-name=description]').value,
                createdDate: Date.now(),
                startDate: null,
                deadline: Date.parse(document.querySelector('#add-modal [data-name=deadline]').value),
                isActive: false,
                categoryId: document.querySelector('#add-modal [name=category]:checked').value,
                estimationTotal: document.querySelectorAll('.radio-block__radio_filled').length - 3,
                estimationUsed: 0,
                priority: document.querySelector('#add-modal [name=priority]:checked').value
            };
            this.controller.sendData(newTask);
            this.render(this.controller.receiveData());
        }
    }

    showModal(query){
        const modalsArticle = document.getElementById('modals-article');
        switch (query) {
            case 'add': {
                const currentModal = document.getElementById('add-modal');

                modalsArticle.style.display = 'flex';
                currentModal.style.display = 'flex';

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

    estimationButtons(target){
        const siblings = target.parentElement.children;
        for(let i = 0; i < siblings.length; i++){
            siblings[i].classList.remove('radio-block__radio_filled');
        }
        for(let i = 0; i < siblings.length; i++){
            siblings[i].classList.add('radio-block__radio_filled');
            if(siblings[i] === target) break;
        }
    }

    showGlobalList(target){
        const container = target.parentElement,
              siblings = container.parentElement.parentElement.children;

        if(target.classList.contains('tabs__tab-link_global-active')){
            container.nextElementSibling.style.display = 'none';

            for(let i = 0; i < siblings.length; i++){
                if(siblings[i].classList.contains('tasks-section')){
                    siblings[i].style.display = 'none';
                }
            }
        }
        else{
            container.nextElementSibling.style.display = 'block';

            for(let i = 0; i < siblings.length; i++){
                if(siblings[i].classList.contains('tasks-section')){
                    siblings[i].style.display = 'block';
                }
            }
        }

        target.classList.toggle('tabs__tab-link_global-active');
    }

    showRemove(){
        let tasks = document.querySelectorAll('.single-task');

        if(tasks[0].classList.contains('single-task_removed')){
            this.controller.sendRemoveRequest();
            this.render();
            this.showRemove();
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

    findList(target){
        let parent = target.parentElement;
        while(parent.classList.contains('main-content__article') === false){
            parent = parent.parentElement;
        }

        return parent.querySelectorAll('ul');
    }

    clickHandler(e){
        const target = e.target;

        let query = target.dataset.query,
            sortPriority = target.dataset.priority,
            sortIsActive = target.dataset.isActive;

        if(query) {
            switch (query){
                case 'global': {
                    e.preventDefault();
                    this.showGlobalList(target);
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
                case 'select': {
                    e.preventDefault();
                    let lists = this.findList(target);
                    for(let i = 0; i < lists.length; i++){
                        let children = lists[i].children;
                        for(let j = 0; j < children.length; j++){
                            if(target.dataset.select === 'select') {
                                if(children[j].classList.contains('single-task__remove-button_active') === false) {
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
                default: this.showModal(query); break;
            }
        }

        if(sortPriority){
            e.preventDefault();
            let siblings = target.parentElement.children;

            let priorityData = this.controller.receiveData({priority: sortPriority});
            priorityData.activeLink = sortPriority;
            this.render(priorityData, false);
        }

        if(sortIsActive){
            e.preventDefault();
            sortIsActive = sortIsActive == 'false' ? false : null;

            let activeData = this.controller.receiveData({isActive: sortIsActive});
            this.render(activeData, true);
        }
    }

    renderGlobalList(sortedData, activeLinkNumber){
        const globalList = document.getElementById('global-list');

        let currentCategory,
            section,
            list;

        globalList.innerHTML = GlobalList();
        globalList.querySelector(`[data-priority="${activeLinkNumber}"]`).classList.add('tabs__tab-link_active');

        sortedData.forEach((task, i) => {
            if(currentCategory === undefined || currentCategory !== task.categoryId){
                section = document.createElement('section');
                list = document.createElement('ul');
                currentCategory =  task.categoryId;

                section.className = `previous-tasks__section tasks-section tasks-section_${task.categoryId}`;
                list.classList.add('tasks-section__list');

                section.innerHTML += `<h2 class="tasks-section__title"><span class="tasks-section__radio"></span>${task.categoryId}</h2>`;
                section.appendChild(list);
                list.innerHTML += SingleTask(task, 'global');
                globalList.appendChild(section);
            }
            else{
                list.innerHTML += SingleTask(task, 'global');
            }
        });

    }

    render(data, isFilter){
        const root = document.getElementById('root');
        let currentData = data || this.controller.receiveData({isActive: null}),
            activeFilter = 5,
            activePage = null;

        if(isFilter === true) currentData = data;
        else currentData = this.controller.receiveData({isActive: null});

        root.innerHTML = Template();

        if(currentData[0].isActive === false) activePage = false;
        root.querySelector(`[data-is-active=${activePage}`).classList.add('tabs__tab-link_active');

        const todayTasksList = document.getElementById('task-list');

        currentData.forEach((task) => {
            if(task.startDate === 'Today'){
                todayTasksList.innerHTML += SingleTask(task, 'today');
            }
        });

        if(isFilter === false){
            currentData = data;
            activeFilter = data.activeLink;
        }
        let sortedData = currentData.filter((task) => {
            if (task.startDate === null) return task;
        }).sort((curr, next) => {
            return curr.categoryId > next.categoryId ? 1 : 0;
        });

        this.renderGlobalList(sortedData, activeFilter);




        /*console.log(id);
        if(id !== undefined){
            const todayTasksList = document.getElementById('task-list');
            let currentTask = currentData.filter((task) => {
                return task.id === id;
            });

            let currentListItem = todayTasksList.querySelector(`[data-id="${id}"]`);
            console.log(todayTasksList, currentListItem);
            todayTasksList.innerHTML += SingleTask(currentTask);
            todayTasksList.removeChild(currentListItem);
        }
        else {*/

        //let tasks = document.querySelectorAll('.single-task');

        /*for(let i = 0; i < tasks.length; i++){
            tasks[i].classList.add('single-task_removed');
        }*/
    }
}