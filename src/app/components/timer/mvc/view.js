import Template from '../template/template.hbs';
import '../template/helpers';
import TimerCompleted from '../template/timer-completed.hbs';
import TimerProcess from '../template/timer-process.hbs';
import {Controller} from './controller';
import Firebase from '../../../services/firebase';

export class View {
  constructor(data) {
    this.controller = new Controller(data);
    this.timer = null;
    this.totalTime = null;
    this.currentState = 'process';
  }

  timeLeft(title) {
    const minutes = Math.floor((this.totalTime - 1) / 60),
          seconds = this.totalTime - 1 % 60;

    if(minutes === 0){
      title.innerHTML = `<span class="timer__body-title-number">${seconds}</span> sec`
    }
    else{
      title.innerHTML = `<span class="timer__body-title-number">${minutes}</span> min`
    }

  }

  animationStart(e){
    const timerTitle = document.querySelector('[data-title=timer]');

    this.timeLeft(timerTitle);

    this.timer = setInterval(() => {
      this.timeLeft(timerTitle);
      this.totalTime--;
    }, 1000);
  }

  animationEnd(e){
    clearInterval(this.timer);
  }

  handleStartTimer() {
    Firebase.getData('settings').then((data) => {
      const timerData = this.controller.getData();
      const timer = document.getElementById('timer');
      timer.innerHTML = TimerProcess(timerData);

      const progress = document.querySelector('[data-anim~="left"]'),
        progressHalf = document.querySelector('[data-anim~="right"]'),
        wrapper = document.querySelector('[data-anim~="wrapper"]');

      progress.style.animationDuration = data[0] + 's';
      progressHalf.style.animationDuration = data[0] / 2 + 's';
      wrapper.style.animationDelay = data[0] / 2 + 's';

      this.totalTime = data[0]; //!!!!!!!!!!!!!convert to minutes

      progress.addEventListener('animationstart', this.animationStart.bind(this));

      progress.addEventListener('animationend', this.animationEnd.bind(this));
    });

  }

  render() {
    const timer = document.getElementById('timer');
    const data = this.controller.getData();

    if (data.pomodoros.length !== 0)
      timer.innerHTML = TimerProcess(data);
    else
      timer.innerHTML = Template(data);

    document.querySelector('[data-query=timerStart]').addEventListener('click', this.handleStartTimer.bind(this));
  }
}
