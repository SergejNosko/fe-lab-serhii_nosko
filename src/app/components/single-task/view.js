import Template from './template.hbs';

export function SingleTask(data) {
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = Template(data);
}
