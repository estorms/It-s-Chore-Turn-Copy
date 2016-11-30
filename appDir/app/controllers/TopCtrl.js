 "use strict";

app.controller("TopCtrl", function($scope, $q, $location, $window, AuthFactory) {
  $scope.isLoggedIn = false;
  let currentUser = null;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user.uid;
      $scope.isLoggedIn = true;
      console.log("Current user logged in?", user.uid);
    } else {
      currentUser = null;
      $scope.isLoggedIn = false;
      $window.location.href = "#/login";
    }
      $scope.apply();

  });

  $scope.getUser = function() {
    return $q(function(resolve, reject){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log("user in get user", user.uid);
          resolve(user.uid);
        }
      });
    });
  };

  $scope.logout = function () {
    AuthFactory.logoutUser()
    .then(function(data) {
      console.log("logged out", data);
    });
  };

  $scope.goToAddNew = function () {
    console.log('you clicked goToAddNew')
      $window.location.href = "#/newchore";
    }

    $scope.goHome = function () {
      console.log('you clicked goHome')
      $window.location.href = "#/home"
    }

    $scope.showMeData = function () {
    console.log('you clicked showMeData')
      $window.location.href = "#/householddata";
    };

    $scope.allChores = function () {
    console.log('you clicked allChores')
      $window.location.href = "#/allchores";
    };

    $scope.signMeUp = function () {
      console.log('you clicked signMeUp')
      $window.location.href = "#/login"
    };

});

