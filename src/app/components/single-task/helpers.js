import Handlebars from 'handlebars/runtime';

Handlebars.registerHelper('$classHelper', (priority, category) => {
    let classString = 'task-article__list-item single-task ';
    switch(+priority){
        case 1: classString += 'single-task_urgent '; break;
        case 2: classString += 'single-task_high '; break;
        case 3: classString += 'single-task_middle '; break;
        case 4: classString += 'single-task_low '; break;
    }

    classString += 'single-task_' + category;

    return classString;
});