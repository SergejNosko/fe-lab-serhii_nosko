import Handlebars from "handlebars/runtime";

Handlebars.registerHelper("$headerTitle", (hash) => {
    if(hash === "#" || hash === "#task-list" || hash.id === "root"){
        return `Daily Task List 
                    <a href="#" data-query="add" 
                        class="main-header__link main-header__add-button" 
                        data-title="Add task">+</a>`;
    }

    return hash.substring(1);
});

Handlebars.registerHelper("$menuItems", (hash) => {
    if(hash === "#task-list" || hash.id === "root"){
        return `<li class="main-header__list-item main-header__list-item_add"><a href="#" data-query="add"
                                                                         class="main-header__link main-header__link icon-add"
                                                                         data-title="Add Task"><span id="remove-number"></span></a></li>
        <li class="main-header__list-item"><a href="#" class="main-header__link icon-trash"
                                              data-title="Go to Removed Tasks" data-query="remove"></a></li>`;
    }
});
