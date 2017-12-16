import {Model} from './model';

export class Controller{
    constructor(){
        this.model = new Model();
    }

    sendData(data){
        this.model.setData(data);
    }

    receiveData(filter){
        let data = this.model.getData(filter);

        return data;
    }
}