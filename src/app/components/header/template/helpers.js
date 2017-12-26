import Handlebars from 'handlebars/runtime';

Handlebars.registerHelper('$headerTitle', (hash) => {
    switch (hash){
        case 'task-list': {
            return `Daily Task List 
                    <a href="#" data-query="add" 
                        class="main-header__link main-header__add-button" 
                        title="Add task">+</a>`
        }
      case 'timer': {
        return '';
      }
      default: return hash;
    }
});

Handlebars.registerHelper('$menuItems', (hash) => {
    if(hash === 'task-list'){
        return `<li class="main-header__list-item main-header__list-item_add"><a href="#" data-query="add"
                                                                         class="main-header__link main-header__link icon-add"
                                                                         title="Tooltip"><span id="remove-number"></span></a></li>
        <li class="main-header__list-item"><a href="#" class="main-header__link icon-trash"
                                              title="Go to Removed Tasks" data-query="remove"></a></li>`
    }
});
