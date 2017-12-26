import Template from '../template/template.hbs';
import TimerCompleted from '../template/timer-completed.hbs';
import {Controller} from './controller';

export class View{
    constructor(data){
        this.controller = new Controller(data);
    }

    handleStartTimer(){
        const timer = document.getElementById('timer');
        //window.location.hash = 'timer';
        timer.innerHTML = TimerCompleted();

        this.controller.setData({isActive: false});
    }

    render(){
        const timer = document.getElementById('timer');
        const data = this.controller.getData();

        timer.innerHTML = Template(data);

        document.querySelector('[data-query=timerStart]').addEventListener('click', this.handleStartTimer.bind(this));
    }
}
