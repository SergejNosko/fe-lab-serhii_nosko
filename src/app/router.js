import {EventBus} from './services/eventBus';
import Report from './pages/reports-page/index';
import Timer from './pages/timer-page/index';
import Settings from './pages/settings-page/index';
import TaskList from './pages/settings-page/index';

class Router {
    constructor(){
        if(Router.instance){
            return Router.instance;
        }

        this.routes = {
            '/timer': Timer,
            '/task-list': TaskList,
            '/settings': Settings,
            '/report': Report
        };

        this.root = '/task-list';

        Router.instance = this;
    }

    add(path, component){
        this.routes[path] = component;
    }

    remove(path){
        delete this.routes[path];
    }

    changeRootPath(path){
        this.root = path;
    }

    init(){
        let pathname = window.location.pathname;
        for(let key in this.routes){
            EventBus.add(key, this.routes[key]);
        }

        if(pathname === '/') EventBus.dispatch(window.location.host + this.root);
        else EventBus.dispatch(pathname);
    }
}

let router = new Router();

router.init();