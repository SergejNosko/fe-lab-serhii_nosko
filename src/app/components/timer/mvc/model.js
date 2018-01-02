import {EventBus} from '../../../services/eventBus';
import Firebase from '../../../services/firebase';
import Notification from '../../../components/notifications/index';

export class Model{
    constructor(data){
        this.data = data;

        if(!this.data.pomodoros)
          this.data.pomodoros = [];

       for(let i = 0; i < this.data.estimationTotal; i++) {
          if(!this.data.pomodoros[i])
            this.data.pomodoros[i] = {
              status: 'none'
            }
        }
    }

    fillRemainedPomodoros(){
      for(let i = 0; i < this.data.pomodoros.length; i++){
        if(this.data.pomodoros[i].status === 'none')
          this.data.pomodoros[i].status = 'failed';
      }

      this.data.estimationUsed = this.data.estimationTotal;

      Firebase.updateValue(this.data).catch((err) => {
        Notification().showMessage('error', 'Oops! Error was occurred!');
      });
    }

    checkPomodoros(){
      return this.data.pomodoros.every((pomodoro) => {
        return pomodoro.status !== 'none'
      });
    }

    setEstimation(data){
      let index;

      this.data.pomodoros.find((pomodoro, i) => {
        if(pomodoro.status === 'none'){
         index = i;
         return pomodoro;
        }
      });

      this.data.pomodoros[index].status = data.status;
      this.data.estimationUsed++;

      Firebase.updateValue(this.data).then((data) => {
        Notification().showMessage('success', 'You completed task!');
      }).catch((err) => {
        Notification().showMessage('error', 'Oops! Error was occurred!');
      });
    }

    getData(){
        return this.data;
    }

    setData(data){
        this.data = {...this.data, ...data};
        EventBus.dispatch('setData', this.data);
    }
}
