import Handlebars from 'handlebars/runtime';

Handlebars.registerHelper('$classHelper', (priority, category, type) => {
    let classString = 'single-task ';

    switch (type){
        case 'global': classString += 'tasks-section__list-item '; break;
        default: classString += 'task-article__list-item ';
    }

    switch(+priority){
        case 1: classString += 'single-task_urgent '; break;
        case 2: classString += 'single-task_high '; break;
        case 3: classString += 'single-task_middle '; break;
        case 4: classString += 'single-task_low '; break;
    }

    classString += 'single-task_' + category;

    return classString;
});

Handlebars.registerHelper('$buttonsHelper', (type) => {
    if(type === 'global') return `<a href="#" class="single-task__edit-link icon-arrows-up" title="Push taks up"></a>`;
    return;
});

Handlebars.registerHelper('$dateHelper', (date) => {
    let dateObj = new Date(date);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    if(dateObj === Date.now()) return 'today';

    return `<span class="single-task__time-number">${dateObj.getDate()}</span> ${months[dateObj.getMonth()]}`;
});