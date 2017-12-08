import {Controller} from './controller';
import Template from './template.hbs';
import FirstEntranceTemplate from './first-entrance-template.hbs';
import SingleTask from '../../components/single-task/index';

export class View{
    constructor(){
        this.controller = new Controller();

        document.body.addEventListener('click', this.clickHandler.bind(this));
    }

    handleSubmit(e){
        let target = e.target;

        if(target.type === 'submit'){

            let newTask = {
                title: document.querySelector('[data-name=title]').value,
                description: document.querySelector('[data-name=description]').value,
                deadline: document.querySelector('[data-name=deadline]').value,
                categoryId: document.querySelector('[name=category]:checked').value,
                estimation: 4,
                priority: document.querySelector('[name=priority]:checked').value
            };
            let newData = this.controller.sendData(newTask);
            this.render(newData);
        }
    }

    showModal(query){
        const modalsArticle = document.getElementById('modals-article');
        switch (query) {
            case 'edit': {
                const currentModal = document.getElementById('edit-modal');

                modalsArticle.style.display = 'flex';
                currentModal.style.display = 'flex';
                break;
            }
            case 'add': {
                const currentModal = document.getElementById('add-modal');

                modalsArticle.style.display = 'flex';
                currentModal.style.display = 'flex';

                document.querySelector('.modals-article').addEventListener('click', this.handleSubmit.bind(this));
                break;
            }
            case 'close': {
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

        root.innerHTML = Template();

        const todayTasksList = document.getElementById('task-list');

        currentData.forEach((task) => {
            todayTasksList.innerHTML += SingleTask(task);
        });
    }
}