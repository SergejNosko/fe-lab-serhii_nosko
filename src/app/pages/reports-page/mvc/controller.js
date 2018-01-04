import {Model} from "./model";

export class Controller{
  constructor(data){
    this.model = new Model(data);
  }

  receiveData(){
    return this.model.sendData()
  }
}
