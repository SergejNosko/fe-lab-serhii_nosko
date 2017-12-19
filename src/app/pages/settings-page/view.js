import Template from './template.hbs';
import Controller from './controller';
import Firebase from '../../services/firebase';

export function View() {
    const root = document.getElementById('root');
    let isNewUser = sessionStorage.getItem('isNewUser');

    root.innerHTML = Template();

    if(!isNewUser) Controller();
    else{
        Firebase.getData('settings').then((data) => {
           Controller(data);
        });
    }
}
