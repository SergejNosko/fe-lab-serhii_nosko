import './helpers';
import Template from './template.hbs';
import {Controller} from './controller';

export class View {
    constructor(data){
        this.controller = new Controller(data);

        document.body.addEventListener('click', this.showModal.bind(this));
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

    showModal(e){
        let target = e.target;
        const modalsArticle = document.getElementById('modals-article'),
              currentModal = document.getElementById('edit-modal'),
              data = this.controller.receiveData();

        if(target.parentElement.dataset.id == data.id){
            modalsArticle.style.display = 'flex';
            currentModal.style.display = 'flex';

            document.querySelector('[data-query=edit]').addEventListener('click', this.handleSubmit.bind(this));
        }

        if(target.dataset.query === 'close'){
            e.preventDefault();
            document.querySelector('.modals-article').removeEventListener('click', this.handleSubmit);
            currentModal.style.display = 'none';
            modalsArticle.style.display = 'none';
        }
    }

    render(data){
        let newData = data || this.controller.receiveData();

        return Template(newData);
    }
}
