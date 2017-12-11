import {EventBus} from "../../services/eventBus";

export class Model{
    constructor(){
        this.data = {
            todayTasks: [
                {
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
                    categoryId: 'hobby'
                },
                {
                    id: 1,
                    title: 'Lorem ipsum sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    createDate: 'Today',
                    startDate: 'Today',
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
                    startDate: 'Today',
                    deadline: 1514152800000,
                    isActive: false,
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
                    startDate: 'Today',
                    deadline: 1514152800000,
                    isActive: false,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 2,
                    categoryId: 'education'
                }
            ]
        };

        EventBus.add('setData', this.setData, this);
    }

    setData(data){
        let isNew = this.data.todayTasks.filter((task) => {
            return task.id === data.id;
        });

        if(isNew.length !== 0){
            this.data.todayTasks[isNew[0].id] = {...this.data.todayTasks[isNew[0].id], ...data};
            EventBus.dispatch('stateChange');
        }
        else{
            this.data.todayTasks.push(data);
        }
    }

    getData(){
        return this.data.todayTasks;
    }
}