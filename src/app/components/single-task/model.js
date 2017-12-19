import {EventBus} from '../../services/eventBus';

export class Model{
    constructor(data){
        this.data = data;
    }

    setData(data){
        this.data = {...this.data, ...data};
        EventBus.dispatch('setData', this.data);
    }

    sendTaskToRemove(){
        EventBus.dispatch('setTasksToRemove', this.data.id);
    }

    removeTask(){
        EventBus.dispatch('removeImmediate');
        EventBus.dispatch('stateChange');
    }

    getData(){
        return this.data;
    }
}