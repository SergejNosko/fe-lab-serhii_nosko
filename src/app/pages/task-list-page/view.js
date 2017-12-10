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
                title: document.querySelector('#add-modal [data-name=title]').value,
                description: document.querySelector('#add-modal [data-name=description]').value,
                deadline: document.querySelector('#add-modal [data-name=deadline]').value,
                categoryId: document.querySelector('#add-modal [name=category]:checked').value,
                estimation: 4,
                priority: document.querySelector('#add-modal [name=priority]:checked').value
            };
            this.controller.sendData(newTask);
            this.render(this.controller.receiveData());
        }
    }

    showModal(query){
        const modalsArticle = document.getElementById('modals-article');
        switch (query) {
            /*case 'edit': {
                const currentModal = document.getElementById('edit-modal');

                modalsArticle.style.display = 'flex';
                currentModal.style.display = 'flex';
                break;
            }*/
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

    clickHandler(e){
        const target = e.target;

        let query = target.dataset.query;

        if(query) {
            switch (query){
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
    }
}