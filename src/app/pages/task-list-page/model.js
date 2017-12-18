import {EventBus} from "../../services/eventBus";
import Firebase from '../../services/firebase';

export class Model{
    constructor(){
        this.data = Firebase.getData().then(data => {
                        return data;
                    });
                /*{
                    id: 0,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: 'Today',
                    deadline: 1514152800000,
                    isActive: false,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 2,
                    categoryId: 'education'
                },
                {
                    id: 1,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: null,
                    deadline: 1514152800000,
                    isActive: false,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 1,
                    categoryId: 'work'
                },
                {
                    id: 2,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: null,
                    deadline: 1514152800000,
                    isActive: null,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 4,
                    categoryId: 'sport'
                },
                {
                    id: 3,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: null,
                    deadline: 1514152800000,
                    isActive: null,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 2,
                    categoryId: 'work'
                },
                {
                    id: 4,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: 'Today',
                    deadline: 1514152800000,
                    isActive: null,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 2,
                    categoryId: 'hobby'
                },
                {
                    id: 5,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: null,
                    deadline: 1514152800000,
                    isActive: null,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 1,
                    categoryId: 'education'
                },
                {
                    id: 6,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: 'Today',
                    deadline: 1514152800000,
                    isActive: null,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 4,
                    categoryId: 'sport'
                },
                {
                    id: 7,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: 'Today',
                    deadline: 1514152800000,
                    isActive: null,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 2,
                    categoryId: 'education'
                },
                {
                    id: 8,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: null,
                    deadline: 1514152800000,
                    isActive: false,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 1,
                    categoryId: 'education'
                },
                {
                    id: 9,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: null,
                    deadline: 1514152800000,
                    isActive: false,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 4,
                    categoryId: 'sport'
                },
                {
                    id: 10,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: null,
                    deadline: 1514152800000,
                    isActive: false,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 2,
                    categoryId: 'education'
                }*/



        this.tasksToRemove = [];

        EventBus.add('setData', this.setData, this);
        EventBus.add('setTasksToRemove', this.setTasksToRemove, this);
        EventBus.add('getRemovedTaskLength', this.getRemovedTasksLength, this);
    }

    getRemovedTasksLength(){
        return this.tasksToRemove.length;
    }

    setTasksToRemove(id, type){
        let existedTask = this.tasksToRemove.indexOf(id);
        if(existedTask !== -1 || (existedTask !== -1 && type && type === 'deselect')) this.tasksToRemove.splice(existedTask, 1);
        if(existedTask === -1 || (existedTask === -1 && type && type === 'select')) this.tasksToRemove.push(id);
    }

    removeTasks(){
        for(let i = 0; i < this.tasksToRemove.length; i++){
            for(let j = 0; j < this.data.length; j++){
                if(this.tasksToRemove[i] == this.data[j].id) {
                    this.data.splice(j, 1);
                    break;
                }
            }
        }
        this.tasksToRemove = [];
    }

    setData(data){
        if(data.startDate === 'Today'){
            if(
                this.data.filter((task) => {
                    return task.startDate === 'Today';
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

        if(index !== undefined){
            this.data[0][index] = {...this.data[index], ...data};
            EventBus.dispatch('stateChange');
            Firebase.updateValue(data);
        }
        else{
            this.data.push(data);
            Firebase.setValue(data);
        }
    }

    getData(filter){
        if(filter){
            let field;
            for(let key in filter){
                field = key;
            }

            if(filter[field] != 5) {
                return this.data.filter((task) => {
                    return task[field] == filter[field]
                });
            }
        }

        /*for(let key in this.data[0]){
            console.log('key', key);
        }*/

        return this.data;
    }
}