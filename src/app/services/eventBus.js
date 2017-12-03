export let EventBus = {
    listeners: {},

    add: function(type, callback, scope){
        if(typeof this.listeners[type] !== 'undefined'){
            this.listeners[type].push({scope, callback});
        }
        else{
            this.listeners[type] = [{scope, callback}];
        }
    },

    remove: function(type, callback, scope){
        if(typeof this.listeners[type] !== "undefined") {
            let numOfCallbacks = this.listeners[type].length;
            let newArray = [];
            for(let i = 0; i < numOfCallbacks; i++) {
                let listener = this.listeners[type][i];
                if(listener.scope === scope && listener.callback === callback) {

                } else {
                    newArray.push(listener);
                }
            }
            this.listeners[type] = newArray;
        }
    },

    dispatch: function(type){
        let event = {
            type: type
        };
        /*let args = [];
        let numOfArgs = arguments.length;
        for(let i = 0; i < numOfArgs; i++){
            args.push(arguments[i]);
        }
        args = args.length > 2 ? args.splice(2, args.length-1) : [];
        args = [event].concat(args);*/

        if(typeof this.listeners[type] !== "undefined") {
            let listeners = this.listeners[type].slice();
            let numOfCallbacks = listeners.length;
            for(let i = 0; i < numOfCallbacks; i++) {
                let listener = listeners[i];
                if(listener && listener.callback) {
                    //let concatArgs = args.concat(listener.args);
                    listener.callback.apply(listener.scope);
                }
            }
        }
    }
};