import Template from './template.hbs';

export function Timer() {
    const root = document.getElementById('root');

    root.innerHTML = Template();
}
