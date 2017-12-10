import {Model} from './model';

export class Controller{
    constructor(){
        this.model = new Model();
    }

    sendData(data){
        this.model.setData(data);
    }

    receiveData(){
        let data = this.model.getData();

        return data;
    }
}