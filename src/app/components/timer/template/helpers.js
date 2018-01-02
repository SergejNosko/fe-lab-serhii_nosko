import Handlebars from 'handlebars/runtime';

Handlebars.registerHelper('$estimations', (number, pomodoros) => {
  let list = `<ul class="timer__pomodoros">`;

  for(let i = 0; i < number; i++){
    list += `<li class="timer__pomodoros-item">
               <div class="timer__pomodoros-item timer__pomodoros-item_${pomodoros[i].status}"></div>
             </li>`;
  }

  return list + `</ul>`;
});
