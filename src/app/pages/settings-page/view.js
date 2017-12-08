import Template from './template.hbs';

export function View() {
    const root = document.getElementById('root');

    root.innerHTML = Template();

    require('./controller');
}