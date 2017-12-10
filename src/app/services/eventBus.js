export const EventBus = {
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
        let args = [];

        for(let i = 1; i < arguments.length; i++){
            args.push(arguments[i]);
        }
        if(typeof this.listeners[type] != "undefined") {
            let listeners = this.listeners[type].slice();
            let numOfCallbacks = listeners.length;
            for(let i = 0; i < numOfCallbacks; i++) {
                let listener = listeners[i];
                if(listener && listener.callback) {
                    listener.callback.apply(listener.scope, args);
                }
            }
        }
        /*if(typeof this.listeners[type] !== "undefined") {
            let listeners = this.listeners[type].slice();
            let numOfCallbacks = listeners.length;
            for(let i = 0; i < numOfCallbacks; i++) {
                let listener = listeners[i];
                if(listener && listener.callback) {
                    listener.callback.apply(listener.scope);
                }
            }
        }*/
    }
};