(function (config, factory) {
    const firebase = require('firebase');

    firebase.initializeApp(config);

    let database = firebase.database();

    module.exports = factory(database);


})(config = {
    apiKey: "AIzaSyBp3LNeGd5-vpIKPYeLHve-DoZx4cnaLZs",
    authDomain: "pomodoro-app-444c5.firebaseapp.com",
    databaseURL: "https://pomodoro-app-444c5.firebaseio.com",
    projectId: "pomodoro-app-444c5",
    storageBucket: "",
    messagingSenderId: "645997009951"

}, (database) => {
    let firebaseUserApi = {},
        taskSchema = database.ref('task');


    firebaseUserApi = function() {

    };

    firebaseUserApi.prototype = {
        setValue: function(value, ref) {
            let table = database.ref('task/' + value.id);

            if(ref) table = database.ref(ref);

            return table.set(value);
        },
        updateValue: function (value) {
            return database.ref('task/' + value.id).update(value);
        },
        getData: function (ref) {
            return new Promise((resolve, reject) => {
                if(ref) taskSchema = database.ref(ref);
                else taskSchema = database.ref('task');

                taskSchema.once('value').then((data) => {
                    resolve(Object.values(data.val()));
                });
            });
        },
        removeData: function (id) {
            return database.ref('task/' + id).remove();
        }
    };

    let firebaseUserApiObj = new firebaseUserApi();

    return firebaseUserApiObj;
});
