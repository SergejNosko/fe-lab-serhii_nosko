import firebase from "firebase";

/**
 * @namespace Firebase
 * */
export default (function (config, factory) {


    firebase.initializeApp(config);

    let database = firebase.database();

    return factory(database);


})({
    apiKey: "AIzaSyBp3LNeGd5-vpIKPYeLHve-DoZx4cnaLZs",
    authDomain: "pomodoro-app-444c5.firebaseapp.com",
    databaseURL: "https://pomodoro-app-444c5.firebaseio.com",
    projectId: "pomodoro-app-444c5",
    storageBucket: "",
    messagingSenderId: "645997009951"

}, (database) => {
    let firebaseUserApi = {},
        taskSchema = database.ref("task");


    firebaseUserApi = function() {

    };

    firebaseUserApi.prototype = {
        /**
       * Saves data to the Firebase DB
       * @param {object} value - task object
       * @param {string} ref - database reference
       * @return {array} tasks array
       * @memberOf Firebase
       * */
        setValue: function(value, ref) {
            let table = database.ref("task/" + value.id);

            if(ref) table = database.ref(ref);

            return table.set(value);
        },
        /**
       * Updates data in the Firebase DB
       * @param {object} value - task object
       * @param {string} ref - database reference
       * @return {array} tasks array
       * @memberOf Firebase
       * */
        updateValue: function (value, ref) {
            let table = database.ref("task/" + value.id);

            if(ref) table = database.ref(ref);

            return table.update(value);
        },
        /**
       * Gets data from the Firebase DB
       * @param {string} ref - database reference
       * @return {Promise} Promise with the tasks array
       * @memberOf Firebase
       * */
        getData: function (ref) {
            return new Promise((resolve) => {
                if(ref) taskSchema = database.ref(ref);
                else taskSchema = database.ref("task");

                taskSchema.once("value").then((data) => {
                    resolve(Object.values(data.val()));
                });
            });
        },
        /**
       * Removes data from the Firebase DB
       * @param {string} id - task id
       * @return {array} tasks array
       * @memberOf Firebase
       * */
        removeData: function (id) {
            return database.ref("task/" + id).remove();
        }
    };

    let firebaseUserApiObj = new firebaseUserApi();

    return firebaseUserApiObj;
});
