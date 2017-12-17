import {Model} from './model';

export class Controller{
    constructor(){
        this.model = new Model();
    }

    sendData(data){
        this.model.setData(data);
    }

    setRemovedTask(id, type){
        this.model.setTasksToRemove(id, type);
    }

    sendRemoveRequest(){
        this.model.removeTasks();
    }

    receiveData(filter){
        let data = this.model.getData(filter);

        return data;
    }
}