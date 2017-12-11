import {Controller} from './controller';
import Template from './template.hbs';
import FirstEntranceTemplate from './first-entrance-template.hbs';
import SingleTask from '../../components/single-task/index';
import {EventBus} from "../../services/eventBus";

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
                id: Math.round(Math.random() * 10000),
                title: document.querySelector('#add-modal [data-name=title]').value,
                description: document.querySelector('#add-modal [data-name=description]').value,
                deadline: Date.parse(document.querySelector('#add-modal [data-name=deadline]').value),
                categoryId: document.querySelector('#add-modal [name=category]:checked').value,
                estimationTotal: document.querySelectorAll('.radio-block__radio_filled').length - 3,
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
        console.log(siblings);
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

    clickHandler(e){
        const target = e.target;

        let query = target.dataset.query;

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
                default: this.showModal(query); break;
            }
        }
    }

    render(data){
        const root = document.getElementById('root');
        const currentData = data || this.controller.receiveData();

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
        root.innerHTML = Template();

        const todayTasksList = document.getElementById('task-list');

        currentData.forEach((task) => {
            todayTasksList.innerHTML += SingleTask(task);
        });

        let tasks = document.querySelectorAll('.single-task');

        /*for(let i = 0; i < tasks.length; i++){
            tasks[i].classList.add('single-task_removed');
        }*/
    }
}