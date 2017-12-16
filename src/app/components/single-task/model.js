import {EventBus} from '../../services/eventBus';

export class Model{
    constructor(data){
        this.data = data;
    }

    setData(data){
        this.data = {...this.data, ...data};
        let isCorrect = EventBus.dispatch('setData', this.data);
    }

    getData(){
        return this.data;
    }
}