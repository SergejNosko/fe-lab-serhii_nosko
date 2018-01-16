import {EventBus} from "../../../services/eventBus";
import Firebase from "../../../services/firebase";
import Notification from "../../../components/notifications/index";

/**
 * @module TaskListModel
 * */
export class Model{
    /**
   * Initialize data and tasksToRemove fields
   * @param {array} data - array of the tasks data
   * */
    constructor(data){
        this.data = data;
        this.tasksToRemove = [];

        EventBus.add("setData", this.setData, this);
        EventBus.add("setTasksToRemove", this.setTasksToRemove, this);
        EventBus.add("getRemovedTaskLength", this.getRemovedTasksLength, this);
        EventBus.add("removeImmediate", this.removeTasks, this);
    }

    /**
     * Returns a length of the tasksToRemove array
     * @return {number} tasksToRemove array length
     * */
    getRemovedTasksLength(){
        return this.tasksToRemove.length;
    }

    /**
     * Adds task to the tasksToRemove array
     * @param {string} id - task id
     * @param {string} type - task type
     * */
    setTasksToRemove(id, type){
        let existedTask = this.tasksToRemove.indexOf(id);
        if(existedTask !== -1 || (existedTask !== -1 && type && type === "deselect")) this.tasksToRemove.splice(existedTask, 1);
        if(existedTask === -1 || (existedTask === -1 && type && type === "select")) this.tasksToRemove.push(id);
    }

    /**
     * Removes all tasks which id's are in the tasksToRemove array
     * */
    removeTasks(){
        for(let i = 0; i < this.tasksToRemove.length; i++){
            for(let j = 0; j < this.data.length; j++){
                if(this.tasksToRemove[i] == this.data[j].id) {
                    this.data.splice(j, 1);
                    Firebase.removeData(this.tasksToRemove[i]).then(() => {
                        Notification().showMessage("success", "Task was successfully removed!");
                    }).catch((err) => {
                        Notification().showMessage("error", "Oops! Error was occurred! " + err.message);
                    });
                    break;
                }
            }
        }
        this.tasksToRemove = [];
    }

    /**
     * Adds new tasks or modify the existing one
     * @param {object} data - task data
     * */
    setData(data){
        if(data.startDate){
            if(
                this.data.filter((task) => {
                    return task.startDate && task.isActive !== false;
                }
                ).length >= 5){
                Notification().showMessage("note", "Max number of tasks for today!");
                return;
            }
        }

        let index;

        this.data.forEach((task, i) => {
            if(task.id === data.id) index = i;
        });

        if(index !== undefined){
            this.data[index] = {...this.data[index], ...data};
            EventBus.dispatch("stateChange");
            Firebase.updateValue(data).then(() => {
                Notification().showMessage("success", "Task was successfully updated!");
            }).catch((err) => {
                Notification().showMessage("error", "Oops! Error was occurred! " + err.message);
            });
        }
        else{
            this.data.push(data);
            Firebase.setValue(data).then(() => {
                Notification().showMessage("success", "Task was successfully added!");
            }).catch((err) => {
                Notification().showMessage("error", "Oops! Error was occurred! " + err.message);
            });
        }
    }

    /**
     * Filters and returns tasks data
     * @param {string} filter - string to filter tasks array
     * @return {array} filtered tasks array
     * */
    getData(filter){
        let requiredData = this.data;
        if(filter){
            for(let key in filter){
                requiredData = requiredData.filter((task) => {
                    if(key === "isActive" || typeof task[key] === "string" && typeof filter[key] === "string"){
                        return filter[key] == task[key];
                    }
                    return !!filter[key] == !!task[key];
                });
            }
        }
        return requiredData;
    }
}
