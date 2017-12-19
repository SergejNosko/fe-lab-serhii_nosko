import Template from './template.hbs';

export default function () {
    return {
        showMessage: function (type, message) {
            const root = document.getElementById('root');

            root.innerHTML += Template({type: type, message: message});
        }
    }
}