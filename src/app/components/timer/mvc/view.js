import Template from '../template/template.hbs';
import '../template/helpers';
import TimerCompleted from '../template/timer-completed.hbs';
import TimerBreak from '../template/timer-break.hbs';
import TimerProcess from '../template/timer-process.hbs';
import {Controller} from './controller';
import Firebase from '../../../services/firebase';
import Notification from '../../../components/notifications/index';

export class View {
  constructor(data) {
    this.controller = new Controller(data);
    this.timer = null;
    this.totalTime = null;
    this.currentState = 'process';
  }

  timeLeft(title) {
    const minutes = Math.floor((this.totalTime) / 60),
          seconds = this.totalTime % 60;
    const subString = this.currentState === 'break' ? 'break' : '';

    if(minutes === 0){
      title.innerHTML = `${subString}<span class="timer__body-title-number">${seconds}</span> sec`
    }
    else{
      title.innerHTML = `${subString}<span class="timer__body-title-number">${minutes}</span> min`
    }

  }

  animationStart(){
    this.totalTime = this.setIterationTime();

    console.log(this.totalTime, this.settings[4]);

    const timerTitle = document.querySelector('[data-title=timer]');

    this.timeLeft(timerTitle);
    this.totalTime--;

    this.timer = setInterval(() => {
      this.timeLeft(timerTitle);
      this.totalTime--;
    }, 1000);
  }

  animationEnd(status){
    clearInterval(this.timer);

    const timer = document.getElementById('timer');
    const data = this.controller.getData();

    this.controller.setEstimation({status: status});

    const isFinished = this.controller.checkPomodoro();

    if(isFinished) {
      timer.innerHTML = TimerCompleted(data);
      this.viewController('visible');
      this.controller.fillRemained();
    }
    else{
      this.currentState = 'break';

      timer.innerHTML = TimerBreak(data);

      this.setAnimationProperties();
    }
  }

  animationBreakEnd(){
    clearInterval(this.timer);

    const buttonsContainer = document.querySelector('[data-buttons="timer-break"]');
    const timerTitle = document.querySelector('[data-title=timer]');

    timerTitle.innerHTML = `Break<br> is over`;
    buttonsContainer.innerHTML += `<button class="button-container__item button-container__item_blue" data-query="timerFinish">Finish Task</button>`;

    this.currentState = 'process';
  }

  setCurrentIteration(){
    if(this.settings[4] === this.settings[1]) {
      this.settings[4] = 1;
    }
    else{
      this.settings[4]++;
    }

    Firebase.updateValue(this.settings, 'settings');
  }

  setIterationTime(){
    if(this.currentState === 'process'){
      return this.settings[0];
    }
    else{
      if(this.settings[4] === this.settings[1]) {
        return this.settings[3];
      }
      return this.settings[2];
    }
  }

  setAnimationProperties(){
    const progress = document.querySelector('[data-anim~="left"]'),
      progressHalf = document.querySelector('[data-anim~="right"]'),
      wrapper = document.querySelector('[data-anim~="wrapper"]');

    const time = this.setIterationTime();

    progress.style.animationDuration = time + 's';
    progressHalf.style.animationDuration = time / 2 + 's';
    wrapper.style.animationDelay = time / 2 + 's';

    progress.addEventListener('animationstart', this.animationStart.bind(this));

    if(this.currentState === 'process'){
      progress.addEventListener('animationend', this.animationEnd.bind(this, 'finished'));
    }
    else{
      progress.addEventListener('animationend', this.animationBreakEnd.bind(this, 'finished'));
    }
  }

  viewController(overflow){
    const header = document.getElementById('main-header');
    const timerButtons = document.getElementById('timer-buttons');

    if(overflow === 'visible'){
      timerButtons.innerHTML += `<a href="#report" class="main-content__back-button icon-arrow-right" title="Go to Global List"></a>`;
    }

    header.style.visibility = overflow;
    timerButtons.style.visibility = overflow;
  }

  handleStartTimer(e) {
    const target = e.target;

    if(!target.dataset.query) return;

    const timerData = this.controller.getData();
    const timer = document.getElementById('timer');

    switch (target.dataset.query){
      case 'timerStart':{
        this.viewController('hidden');
        this.currentState = 'process';
        this.setCurrentIteration();

        timer.innerHTML = TimerProcess(timerData);

        this.setAnimationProperties();
        break;
      }
      case 'finishPomodoro': {
        this.animationEnd.call(this, 'finished');
        break;
      }
      case 'failPomodoro': {
        this.animationEnd.call(this, 'failed');
        break;
      }
      case 'timerFinish': {
        const timer = document.getElementById('timer');
        const data = this.controller.getData();

        this.controller.fillRemained();

        timer.innerHTML = TimerCompleted(data);
      }

    }
  }

  render() {
    const timer = document.getElementById('timer');
    const data = this.controller.getData();

  Firebase.getData('settings').then((settings) => {
    if(data.estimationTotal === data.estimationUsed){
      timer.innerHTML = TimerCompleted(data);
    }
    else{
      this.settings = settings;
      timer.innerHTML = Template(data);
      document.body.addEventListener('click', this.handleStartTimer.bind(this));
    }
  });
  }
}
