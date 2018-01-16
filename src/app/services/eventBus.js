/**
 * @namespace EventBus
 *
 * */
export const EventBus = {
    /**
     * The listeners object
     * @memberOf EventBus
     * */
    listeners: {},

    /**
     * Add a new listener or replace an existing one
     * @param {string} type - type of the listener
     * @param {function} callback - callback
     * @param {object} scope - scope of the callback
     * @memberOf EventBus
     * */
    add: function(type, callback, scope){
        if(typeof this.listeners[type] !== "undefined"){
            this.listeners[type].push({scope: scope, callback: callback});
        }
        else{
            this.listeners[type] = [{scope: scope, callback: callback}];
        }
    },

    /**
     * Remove a listener if it exists
     * @param {string} type - type of the listener
     * @param {function} callback - callback
     * @param {object} scope - scope of the callback
     * @memberOf EventBus
     * */
    remove: function(type, callback, scope){
        if(typeof this.listeners[type] !== "undefined") {
            let numOfCallbacks = this.listeners[type].length;
            let newArray = [];
            for(let i = 0; i < numOfCallbacks; i++) {
                let listener = this.listeners[type][i];
                if(listener.scope !== scope && listener.callback !== callback) {
                    newArray.push(listener);
                }
            }
            this.listeners[type] = newArray;
        }
    },

    /**
   * Invoke a callback according to the type parameter
   * @param {string} type - type of the listener
   * @memberOf EventBus
   * */
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
    }
};
