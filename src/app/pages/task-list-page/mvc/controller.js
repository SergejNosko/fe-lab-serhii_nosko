import {Model} from "./model";

/**
 * @module TaskListController
 * */
export class Controller{
    /**
     * Initialize model field
     * @param {array} data - tasks data array
     * */
    constructor(data){
        this.model = new Model(data);
    }

    /**
     * Send data to the model
     * @param {object} data - task data
     * @return {array} array of the tasks data
     * */
    sendData(data){
        return this.model.setData(data);
    }

    /**
     * Gets length of the tasks array, highlighted to remove
     * @return {number} array length
     * */
    getRemovedTasksLength(){
        let length = this.model.getRemovedTasksLength();

        return length;
    }

    /**
     * Invokes model setTasksToRemove method
     * @param {string} id - task id
     * @param {type} type - task type
     * */
    setRemovedTask(id, type){
        this.model.setTasksToRemove(id, type);
    }

    /**
     * Invokes model removeTasks method
     * @param {string} id - task id
     * */
    sendRemoveRequest(id){
        this.model.removeTasks(id);
    }

    /**
     * Gets an array of filtered tasks
     * @param {string} filter - string to filter the tasks array
     * @return {array} filtered tasks array
     * */
    receiveData(filter){
        let data = this.model.getData(filter);

        return data;
    }
}
