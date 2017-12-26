import {EventBus} from '../../../services/eventBus';

export class Model{
    constructor(data){
        this.data = data;
    }

    getData(){
        return this.data;
    }

    setData(data){
        this.data = {...this.data, ...data};
        EventBus.dispatch('setData', this.data);
    }
}