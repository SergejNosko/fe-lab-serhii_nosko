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
                    deadline: 'today',
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
                    deadline: 'today',
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
                    deadline: 'today',
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
                    deadline: 'today',
                    isActive: false,
                    estimationTotal: 4,
                    estimationUsed: 2,
                    priority: 2,
                    categoryId: 'education'
                }
            ]
        };
    }

    setData(data){
        this.data.todayTasks.push(data);
        return this.data.todayTasks;
    }

    getData(){
        return this.data.todayTasks;
    }
}