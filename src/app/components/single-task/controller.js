import {Model} from "./model";

export class Controller{
    constructor(data){
        this.model = new Model(data);
    }

    sendData(data){
        this.model.setData(data);
    }

    setTaskToRemove(){
        this.model.sendTaskToRemove();
    }

    immediateRemove(){
        this.model.sendTaskToRemove();
        this.model.removeTask();
    }

    receiveData(){
        return this.model.getData();
    }
}