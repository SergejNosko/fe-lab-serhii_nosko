import Template from './template.hbs';

export function TaskList() {
    const root = document.getElementById('root');

    root.innerHTML = Template();
}