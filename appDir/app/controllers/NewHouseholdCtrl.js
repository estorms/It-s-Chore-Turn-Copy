"use strict";
console.log("NewHouseholdCtrl connected")
app.controller("NewHouseholdCtrl", function ($scope, ChoreFactory, $location) {

let userId;

// $scope.title = "Register Your HouseHold";
$scope.btnText = "Register Your Household";

$scope.newHouse = {
    name: '',
    userId: ''
};

$scope.newMember1 = {
    name: '',
    houseId: '',
    pointsEarned: 0
}

$scope.newMember2 = {
    name: '',
    houseId: '',
    pointsEarned: 0
}

$scope.$parent.getUser()
  .then ( (user) => {
    console.log('this is user returned by promise', user)
    userId = user;

  })

$scope.addNewHouse = () => {
    console.log('you clicked addNewHouse')
    let housekey;

    $scope.newHouse.userId = userId;
    console.log('you clicked addnewhouse', $scope.newHouse);
    ChoreFactory.addNewHouse($scope.newHouse)
        .then((result) => {
            console.log('this is the household registered. It will become the housekey', result)
            housekey = result.name;
            console.log('this is the housekey', housekey)
            $scope.newMember1.houseId = housekey;
            $scope.newMember2.houseId = housekey;
            console.log($scope.newMember1, $scope.newMember2);
            ChoreFactory.addMember($scope.newMember1)
            .then((result) => {
                console.log('this is the result of firstadd new member', result);
            })
            ChoreFactory.addMember($scope.newMember2)
            .then((result) => {
                console.log('this is the result of second add new member', result);
                $location.url('/newchore');
            })
        })
    };
});
