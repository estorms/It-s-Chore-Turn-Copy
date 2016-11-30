"use strict";
console.log("NavCtrl connected")
app.controller("NavCtrl", function($scope, $location, $window) {
  // $(document).ready(function(){
  //   // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  //   $('.modal-trigger').leanModal();
  // });
    // $scope.searchText = SearchTermData;
    $scope.navItems = [    //create an array of objects
            {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
            {url: '#/login', name: "Login", showState: "!$parent.isLoggedIn"},

            {url: '#/newchore', name: "New Chore", showState: "$parent.isLoggedIn"},
            {url: '#/newhousehold', name: "New Household", showState: "$parent.isLoggedIn"},
            {url: '#/allchores', name: "All Chores", showState: "$parent.isLoggedIn"},
            {url: '#/home', name: "Home Page", showState: "$parent.isLoggedIn"},
            {url: '#/choreturn', name: "ChoreTurn", showState: "$parent.isLoggedIn" }

    ];



    $scope.isActive = (viewLocation) => {
        console.log($location.path())
        console.log(viewLocation)
        viewLocation === $location.path()
    };

    $scope.testMe = () => {
        console.log('whatever')
    }

    // $scope.goToAddNew = function () {
    // console.log('you clicked goToAddNew')
    //   $location.url('/newchore');
    // }

    // $scope.goToChoreTurn = function () {
    // console.log('you clicked goToChoreTurn')
    //   $location.url('/choreturn');
    // }

});
