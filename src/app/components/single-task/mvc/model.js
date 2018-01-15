import {EventBus} from "../../../services/eventBus";

/**
 * @module SingleTaskModel
 */
export class Model{
  /**
   * Initialize data property
   * @param {object} data - object with task data
   */
    constructor(data){
        this.data = data;
    }

  /**
   * Change the data property to the passed data parameter
   * @param {object} data - object with task data
   */
    setData(data){
        this.data = {...this.data, ...data};
        EventBus.dispatch("setData", this.data);
    }

    /**
     * Makes the task potential for removal
     */
    sendTaskToRemove(){
        EventBus.dispatch("setTasksToRemove", this.data.id);
    }

    /**
     * Remove task
     */
    removeTask(){
        EventBus.dispatch("removeImmediate");
        EventBus.dispatch("stateChange");
    }

    /**
     * Return task data
     * @return {object} Task data
     */
    getData(){
        return this.data;
    }
}
