import {Model} from './model';

export class Controller{
    constructor(data){
        this.model = new Model(data);
    }

    checkPomodoro(){
      return this.model.checkPomodoros();
    }

    setEstimation(data){
      this.model.setEstimation(data);
    }

    getData(){
        return this.model.getData();
    }

    setData(data){
        this.model.setData(data);
    }
}
