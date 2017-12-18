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

    /*taskSchema.on('child_changed', (res) => {
        console.log('Firebase change event triggered! Value - ', res.val());
    });

    taskSchema.on('value', (res) => {
        console.log('Firebase add event triggered! Value - ', res.val());
    });*/

    firebaseUserApi.prototype = {
        setValue: function(value) {
            database.ref('task/' + value.id).set(value);
        },
        updateValue: function (value) {
            database.ref('task/' + value.id).update(value);
        },
        getData: function () {
            return new Promise((resolve, reject) => {
                taskSchema.once('value').then((data) => {
                    resolve(Object.values(data.val()));
                });
            });
        },
        removeData: function (id) {
            database.ref('task/' + id).remove();
        }
    };

    let firebaseUserApiObj = new firebaseUserApi();

    return firebaseUserApiObj;
});