import Template from './template.hbs';
import FirstEntranceTemplate from './first-entrance-template.hbs';

export function TaskList() {
    const root = document.getElementById('root');

   /* if(sessionStorage.getItem('isNewUser') === false){
        root.innerHTML = Template();
    }
    else root.innerHTML = FirstEntranceTemplate();*/

    root.innerHTML = Template();
}