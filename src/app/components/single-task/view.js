import './helpers';
import Template from './template.hbs';
import {Controller} from './controller';
import uuid from 'uuid/v1';
import Timer from '../../pages/timer-page/index';
import {EventBus} from '../../services/eventBus';

export class View {
    constructor(data, type){
        this.controller = new Controller(data);
        this.type = type;

        this.uuid = uuid();

        document.body.addEventListener('click', this.viewControl.bind(this));
    }

    handleSubmit(e){
        e.preventDefault();

        let newTask = {
            title: document.querySelector('#edit-modal [data-name=title]').value,
            description: document.querySelector('#edit-modal [data-name=description]').value,
            deadline: Date.parse(document.querySelector('#edit-modal [data-name=deadline]').value),
            estimationTotal: document.querySelectorAll('.radio-block__radio_filled').length - 3
        };
        if(newTask.description === '' || newTask.title === '' || newTask.deadline === ''){
            if(document.querySelector('#edit-modal [name=category]:checked') === null || document.querySelector('#edit-modal [name=priority]:checked') === null)
                return;
        }
        newTask.categoryId = document.querySelector('#edit-modal [name=category]:checked').value;
        newTask.priority = document.querySelector('#edit-modal [name=priority]:checked').value;

        this.controller.sendData(newTask);

        this.render(this.controller.receiveData());
    }

    handleImmediateRemove(e){
        e.preventDefault();

        this.controller.immediateRemove();
    }

    viewControl(e){
        let target = e.target;
        const modalsArticle = document.getElementById('modals-article'),
              currentModal = document.getElementById('edit-modal'),
              data = this.controller.receiveData(),
              parentId = target.parentElement.parentElement.dataset.id;

        if(parentId == data.id && target.dataset.query === 'edit'){
            modalsArticle.style.display = 'flex';
            currentModal.style.display = 'flex';

            document.querySelector('[data-query=edit]').addEventListener('click', this.handleSubmit.bind(this));
            document.querySelector('[data-query=immediateRemove]').addEventListener('click', this.handleImmediateRemove.bind(this));
        }

        if(target.dataset.query === 'close'){
            e.preventDefault();
            document.querySelector('.modals-article').removeEventListener('click', this.handleSubmit);
            currentModal.style.display = 'none';
            modalsArticle.style.display = 'none';
        }

        if(parentId == data.id && target.dataset.query === 'push'){
            e.preventDefault();

            this.controller.sendData({startDate: Date.now()});

            this.render(this.controller.receiveData());
        }

        if(target.parentElement.dataset.id == data.id && target.parentElement.dataset.unique == this.uuid && target.dataset.query === 'addRemove'){
            this.controller.setTaskToRemove();
            target.classList.toggle('single-task__remove-button_active');
        }

        if(target.parentElement.dataset.id == data.id && target.dataset.query === 'timer'){
            EventBus.dispatch('#timer', data);
        }
    }

    render(data){
        let newData = data || this.controller.receiveData();

        newData.type = this.type;
        newData.unique = this.uuid;

        return Template(newData);
    }
}
