(function () {
  /*-----------------------Main Class-----------------------------*/
  class TaskList{
    constructor(elem, step, minValue, maxValue){
      this.elem = elem;
      this.step = step;
      this.minValue = minValue;
      this.maxValue = maxValue;
      this.index = +elem.dataset.index;
      this.voteInput = elem.querySelector('.single-setting__text-field');
      this.value = +this.voteInput.value;

      this.elem.addEventListener('click', (e) => {
        let target = e.target;

        if(target.classList.contains('single-setting__button_minus')) this.voteAction('decrease');
        else if(target.classList.contains('single-setting__button_add')) this.voteAction('increase');
      });
    }

    voteAction(action){
      if(action === 'increase'){
        if(this.value === this.maxValue) return false;
        this.value += this.step;
      }
      else if(action === 'decrease'){
        if(this.value === this.minValue) return false;
        this.value -= this.step;
      }

      this.voteInput.value = this.value;
      renderObj(this.index, this.value);
    }
  }

  /*----------------------Render Function-------------------------*/
  const render = (taskListArray) => {
    let renderValues = taskListArray.map((task) => {
      return task.value;
    });
    let chart = document.getElementById('chart');

    return (index, value) => {
      chart.innerHTML = '';
      renderValues[index] = value;

      for(let i = 0; i < renderValues[1] * 2; i++){
        let workElem = document.createElement('div');

        workElem.classList.add('chart-container__item');
        workElem.classList.add('chart-container__item_work');
        chart.appendChild(workElem);

        if(i < renderValues[1] * 2 - 1){
          let breakElem = document.createElement('div');
          breakElem.classList.add('chart-container__item');

          if(i === renderValues[1] - 1) breakElem.classList.add('chart-container__item_long-break');
          else breakElem.classList.add('chart-container__item_short-break');

          chart.appendChild(breakElem);
        }
      }
    };
  };


  let voters = [
    new TaskList(document.getElementById('voter1'), 5, 15, 25),
    new TaskList(document.getElementById('voter2'), 1, 2, 5),
    new TaskList(document.getElementById('voter3'), 1, 3, 5),
    new TaskList(document.getElementById('voter4'), 5, 15, 30)
  ];

  let renderObj = render(voters);
  renderObj();
})();
