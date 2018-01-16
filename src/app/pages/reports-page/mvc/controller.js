import {Model} from "./model";

/**
 * @module ReportsPageController
 */
export class Controller{
    /**
   * Initialize the model field
   * @param {array} data - array of tasks
   * */
    constructor(data){
        this.model = new Model(data);
    }

    /**
     * Call proper model method according to the type parameter
     * @param {string} type - type of the required data
     * @param {string} tooltip - a tooltip message
     * */
    receiveData(type, tooltip){
        switch (type){
        case "day": {
            return this.model.getTodayData(tooltip);
        }
        case "week": {
            return this.model.getWeekData(tooltip);
        }
        case "month": {
            return this.model.getMonthData(tooltip);
        }
        }
    }
}
