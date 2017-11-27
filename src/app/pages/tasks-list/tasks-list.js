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
    }),
    chart = document.getElementById('chart');

    function calculateWidth(value, duration) {
      return (value / duration) * 100 + '%';
    }

    function renderLoop(duration) {
      for(let i = 0; i < renderValues[1] * 2; i++){
        let workElem = document.createElement('div');

        workElem.classList.add('chart-container__item');
        workElem.classList.add('chart-container__item_work');
        workElem.style.width = calculateWidth(renderValues[0], duration);
        chart.appendChild(workElem);

        if(i < renderValues[1] * 2 - 1){
          let breakElem = document.createElement('div');
          breakElem.classList.add('chart-container__item');

          if(i === renderValues[1] - 1){
            breakElem.style.width = calculateWidth(renderValues[3], duration);
            breakElem.classList.add('chart-container__item_long-break');
          }
          else {
            breakElem.style.width = calculateWidth(renderValues[2], duration);
            breakElem.classList.add('chart-container__item_short-break');
          }

          chart.appendChild(breakElem);
        }
      }
    }

    function renderDurationList(duration) {
      let hours = Math.round(duration / 60),
          minutes = duration % 60;
      const list = document.getElementById('duration-list');
      list.innerHTML = '';

      for(let i = 1; i <= hours * 2; i++){
        let listItem = document.createElement('li');

        listItem.classList.add('full-chart__list-item');

        if(i % 2 === 0) listItem.innerHTML = `<div class="full-chart__list-item-point"></div> ${i / 2}h`;
        else listItem.innerHTML = `<div class="full-chart__list-item-point"></div> ${(i - 1) / 2}h 30m`;

        if(i === 1) listItem.innerHTML = `<div class="full-chart__list-item-point"></div> 30m`;

        listItem.style.width = calculateWidth(30, duration);

        list.appendChild(listItem);
      }

      if(minutes !== 0){
        let listItem = document.createElement('li');
        listItem.classList.add('full-chart__list-item');
        listItem.innerHTML = `<div class="full-chart__list-item-point"></div> ${hours}h ${minutes}m`;
        listItem.style.width = calculateWidth(minutes, duration);
        list.appendChild(listItem);
      }
    }

    return (index, value) => {
      chart.innerHTML = '';
      renderValues[index] = value;

      let duration = (renderValues[0] + renderValues[2]) * renderValues[1] * 2 - renderValues[2] * 2 + renderValues[3];

      renderLoop(duration);
      renderDurationList(duration);
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
