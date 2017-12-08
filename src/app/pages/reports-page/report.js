import Template from './template.hbs';

export function Report() {
    const root = document.getElementById('root');

    root.innerHTML = Template();
}