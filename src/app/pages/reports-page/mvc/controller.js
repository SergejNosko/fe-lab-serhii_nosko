import {Model} from "./model";

export class Controller{
  constructor(data){
    this.model = new Model(data);
  }

  receiveData(type){
    switch (type){
      case 'day': {
        return this.model.getTodayData();
      }
      case 'week': {
        return this.model.getWeekData();
      }
      case 'month': {
        return this.model.getMonthData();
      }
    }
  }
}
