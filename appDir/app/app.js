"use strict";
console.log('app js connected')
var app = angular.module("ChoreApp", ["ngRoute", "chart.js", "ui.materialize"])
.constant('FirebaseURL','https://its-chore-turn.firebaseio.com');


app.config(function($routeProvider){

    let isAuth = (AuthFactory) => new Promise( (resolve, reject) =>
     {
        if(AuthFactory.isAuthenticated()) {
            resolve();
        } else {
            reject();
        }
    })

    $routeProvider.
        when("/", {
            templateUrl: "partials/login.html",
            controller: "LoginCtrl"
        }).

        when("/login", {
            templateUrl:"partials/login.html",
            controller: "LoginCtrl"
        }).

        when("/newchore", {
            templateUrl: "partials/newchore.html",
            controller: "NewChoreCtrl"
        }).

        when("/newhousehold", {
            templateUrl: "partials/newhousehold.html",
            controller: "NewHouseholdCtrl"
        }).

        when("/allchores", {
            templateUrl: "partials/allchores.html",
            controller: "AllChoresCtrl"
        }).

        when("/home", {
            templateUrl: "partials/choreturn.html",
            controller: "ChoreTurnCtrl"
        }).

        when("/householddata", {
            templateUrl: "partials/householddata.html",
            controller: "HouseholdDataCtrl"
        }).
        when("/editchore/:choreId", {
            templateUrl: "partials/editchore.html",
            controller: "EditChoreCtrl"
        }).

        when("/divorce", {
            templateUrl: "partials/divorce.html",
            controller: "DivorceCtrl"
        }).

        otherwise("/");
});


app.run( ($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
});
