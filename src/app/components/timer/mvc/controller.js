import {Model} from "./model";

/**
 * @module TimerComponentController
 */
export class Controller{
    /**
   * Initialize model field
   */
    constructor(data){
        this.model = new Model(data);
    }

    /**
     * Calls the model addPomodoro method and returns a changed data
     * @return {object} Changed timer data
     */
    addPomodoro(){
        return this.model.addPomodoro();
    }

    /**
   * Calls the model fillRemainedPomodoros method
   */
    fillRemained(){
        this.model.fillRemainedPomodoros();
    }

    /**
     * Check whether all estimations have been done
     * @return {boolean} true if all done, false if not
     */
    checkPomodoro(){
        return this.model.checkPomodoros();
    }

    /**
     * Call model setEstimation method
     * @param {object} data - object width status field
     */
    setEstimation(data){
        this.model.setEstimation(data);
    }

    /**
     * Returns timer data
     * @return {object} timer data
     */
    getData(){
        return this.model.getData();
    }

    /**
     * Calls the setData method of the model
     */
    setData(data){
        this.model.setData(data);
    }
}
