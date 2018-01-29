import Handlebars from "handlebars/runtime";

Handlebars.registerHelper("$headerTitle", (hash) => {
    let title = hash;

    if(hash === "#" || hash === "#task-list" || hash.id === "root"){
        title = `Daily Task List 
                    <a href="#" data-query="add" 
                        class="main-header__link main-header__add-button" 
                        data-title="Add task">+</a>`;
    }
    else{
        title = title.substring(1);
    }

    return title;
});

Handlebars.registerHelper("$menuItems", (hash) => {
    if(hash === "#task-list" || hash.id === "root"){
        return `<li class="main-header__list-item main-header__list-item_add"><a href="#" data-query="add"
                                                                         class="main-header__link main-header__link icon-add"
                                                                         data-title="Add Task"><span id="remove-number"></span></a></li>
        <li class="main-header__list-item"><a href="#" class="main-header__link main-header__link_trash icon-trash"
                                              data-title="Go to Removed Tasks" data-hash="#remove" data-query="remove"><span class="main-header__trash-number" id="trash-number"></span></a></li>`;
    }
});
