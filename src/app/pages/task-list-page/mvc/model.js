import {EventBus} from "../../../services/eventBus";
import Firebase from '../../../services/firebase';
import Notification from '../../../components/notifications/index';

export class Model{
    constructor(data){
        this.data = data;
        this.tasksToRemove = [];

        EventBus.add('setData', this.setData, this);
        EventBus.add('setTasksToRemove', this.setTasksToRemove, this);
        EventBus.add('getRemovedTaskLength', this.getRemovedTasksLength, this);
        EventBus.add('removeImmediate', this.removeTasks, this);
    }

    getRemovedTasksLength(){
        return this.tasksToRemove.length;
    }

    setTasksToRemove(id, type){
        let existedTask = this.tasksToRemove.indexOf(id);
        if(existedTask !== -1 || (existedTask !== -1 && type && type === 'deselect')) this.tasksToRemove.splice(existedTask, 1);
        if(existedTask === -1 || (existedTask === -1 && type && type === 'select')) this.tasksToRemove.push(id);
    }

    removeTasks(id){
        for(let i = 0; i < this.tasksToRemove.length; i++){
            for(let j = 0; j < this.data.length; j++){
                if(this.tasksToRemove[i] == this.data[j].id) {
                    this.data.splice(j, 1);
                    Firebase.removeData(this.tasksToRemove[i]).then((data) => {
                        Notification().showMessage('success', 'Task was successfully removed!');
                    }).catch((err) => {
                        Notification().showMessage('error', 'Oops! Error was occurred!');
                    });
                    break;
                }
            }
        }
        this.tasksToRemove = [];
    }

    setData(data){
        if(data.startDate){
            if(
                this.data.filter((task) => {
                    return task.startDate && task.isActive !== false;
                }
            ).length > 5){
                console.error('Max task number!');
                return;
            }
        }

        let index;

        this.data.forEach((task, i) => {
            if(task.id === data.id) index = i;
        });

        let status;

        if(index !== undefined){
            this.data[index] = {...this.data[index], ...data};
            EventBus.dispatch('stateChange');
            Firebase.updateValue(data).then((data) => {
                Notification().showMessage('success', 'Task was successfully updated!');
            }).catch((err) => {
                Notification().showMessage('error', 'Oops! Error was occurred!');
            });
        }
        else{
            this.data.push(data);
            Firebase.setValue(data).then((data) => {
                Notification().showMessage('success', 'Task was successfully added!');
            }).catch((err) => {
                Notification().showMessage('error', 'Oops! Error was occurred!');
            });
        }
    }

    getData(filter){
        let requiredData = this.data;
            if(filter){
                for(let key in filter){
                    requiredData = requiredData.filter((task) => {
                        if(key === 'isActive' || typeof task[key] === 'string' && typeof filter[key] === 'string'){
                            return filter[key] == task[key]
                        }
                        return !!filter[key] == !!task[key]
                    });
                }
            }
        return requiredData;
    }
}
