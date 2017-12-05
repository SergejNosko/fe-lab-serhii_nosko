import Template from './template.hbs';
import TemplateTimer from '../../components/timer/index';

export function Timer() {
    const root = document.getElementById('root');

    root.innerHTML = Template();

    TemplateTimer();
}
