import {Model} from './model';

export class Controller{
    constructor(data){
        this.model = new Model(data);
    }

    sendData(data){
        return this.model.setData(data);
    }

    getRemovedTasksLength(){
        let length = this.model.getRemovedTasksLength();

        return length;
    }

    setRemovedTask(id, type){
        this.model.setTasksToRemove(id, type);
    }

    sendRemoveRequest(id){
        this.model.removeTasks(id);
    }

    receiveData(filter){
        let data = this.model.getData(filter);

        return data;
    }
}