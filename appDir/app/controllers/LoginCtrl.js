"use strict";
console.log('LoginCtrl connected')
app.controller("LoginCtrl", function($scope, $window, AuthFactory ) {
  $scope.account = {
    email: "",
    password: ""
  };

  let pleaseSignUpToast = null;

  $scope.register = () => {
    console.log("you want to register?");
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then( (userData) => {
      console.log("you're a new user", userData.uid );
     loginNewUser();
    }, (error) => {
      console.log("there's an error creating the user");
    });
  };

let loginNewUser = () => {
    console.log("you clicked login");
    AuthFactory.loginUser($scope.account)
      .then( (data) => {
        console.log("a user has logged in ", data.uid);
        if (data) {
          $window.location.href = "#/newhousehold"
        } else {
          $window.location.href = "#/login"
        }
        console.log("data from login ", data);
      }, (error) => {
        console.log("there's an error logging in");
      });
  };

  $scope.login = () => {
    console.log("you clicked login");
    AuthFactory.loginUser($scope.account)
      .then( (data) => {
        console.log("a user has logged in ", data.uid);
        if (data) {
          $window.location.href = "#/home";
        } else {
          $window.location.href = "#/login";
        }
        console.log("data from login ", data);
      }, (error) => {
        console.log("there's an error logging in");
      });
  };

      $scope.loginWithGoogle = () =>{
        AuthFactory.loginGoogle($scope.account)
        .then((data)=> {
          console.log("a user has logged in with Google", data.uid);
         if (data) {
          $window.location.href = "#/newhousehold";
        } else {
          $window.location.href = "#/login";
        }
        console.log("data from login ", data);
      }, (error) => {
        console.log("there's an error logging in");
      });

  };
});
