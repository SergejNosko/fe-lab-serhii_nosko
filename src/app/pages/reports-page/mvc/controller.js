import {Model} from "./model";

export class Controller{
  constructor(data){
    this.model = new Model(data);
  }

  receiveData(type, tooltip){
    switch (type){
      case 'day': {
        return this.model.getTodayData(tooltip);
      }
      case 'week': {
        return this.model.getWeekData(tooltip);
      }
      case 'month': {
        return this.model.getMonthData(tooltip);
      }
    }
  }
}
