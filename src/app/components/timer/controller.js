import {Model} from './model';

export class Controller{
    constructor(data){
        this.model = new Model(data);
    }

    getData(){
        return this.model.getData();
    }

    setData(data){
        this.model.setData(data);
    }
}