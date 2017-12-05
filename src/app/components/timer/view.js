import Template from './template.hbs';

export function Timer() {
    const timer = document.getElementById('timer');

    timer.innerHTML = Template();
}
