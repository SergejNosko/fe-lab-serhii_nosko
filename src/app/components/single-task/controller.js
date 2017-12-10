import {Model} from "./model";

export class Controller{
    constructor(data){
        this.model = new Model(data);
    }

    sendData(data){
        this.model.setData(data);
    }

    receiveData(){
        return this.model.getData();
    }
}