import Handlebars from 'handlebars/runtime';

Handlebars.registerHelper('$estimations', (number) => {
  let list = `<ul class="timer__pomodoros">`;

  for(let i = 0; i < number; i++){
    list += `<li class="timer__pomodoros-item"><div class="timer__pomodoros-button"></div></li>`;
  }

  return list + `</ul>`;
});
