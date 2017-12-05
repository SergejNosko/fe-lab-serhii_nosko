(function (config, factory) {
    const firebase = require('firebase');

    firebase.initializeApp(config);

    let database = firebase.database(),
        values = database.ref();

    module.exports = factory(values);

})(config = {
    apiKey: "AIzaSyBp3LNeGd5-vpIKPYeLHve-DoZx4cnaLZs",
    authDomain: "pomodoro-app-444c5.firebaseapp.com",
    databaseURL: "https://pomodoro-app-444c5.firebaseio.com",
    projectId: "pomodoro-app-444c5",
    storageBucket: "",
    messagingSenderId: "645997009951"
}, (values) => {
    let firebaseUserApi = {};

    firebaseUserApi = function() {

    };

    values.on('child_changed', (res) => {
        console.log('Firebase change event triggered! Value - ', res.val());
    });

    values.on('value', (res) => {
        console.log('Firebase add event triggered! Value - ', res.val());
    });

    firebaseUserApi.prototype = {
        setValue: function(value) {
            console.log('here');
            values.push(value);
        }
    };

    let firebaseUserApiObj = new firebaseUserApi();

    return firebaseUserApiObj;
});