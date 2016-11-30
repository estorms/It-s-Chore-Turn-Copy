"use strict";
// console.log('NewChoreCtrl connected')
app.controller("LandingCtrl", function ($scope, ChoreFactory, $location, $window){

let hId;
let houseID;
let householdMembersObj;
let householdMembersNamesArr = [];
$scope.houseMem1;
$scope.houseMem2;

angular.element(document).ready(function () {
    console.log('page loading completed');
});

$scope.$parent.getUser()
  .then ( (user) => {
    console.log('this is user returned by promise', user)
    hId = user;
    accesshousehold();
  })


let accesshousehold = () =>{
    console.log('you are inside accesshousehold, this is the first result, a user ID:', hId);
    ChoreFactory.getHouseholdId(hId)
    .then((results) => {
        houseID = results;
        console.log('you are inside accesshousehold, this should be the info you want to pass in to get members: ', houseID)
        ChoreFactory.getHouseholdMembers(houseID)
        .then((householdMembers) => {

            console.log('you are inside accesshousehold', householdMembers)
            for (var prop in householdMembers) { //householdMembers is an object full of other objects. Prop is the name of each internal object (in this case, the 'name' = FB returned numeric value)
                // console.log('hello');
                console.log(householdMembers[prop].name) //here, we are inside *each* object, regardless of its name (aka top-levelprop) and as identified by houseMembers[prop], and accessing a property specific to that object with dot notation. We have to use brackets on "prop" b/c we are access more than one object.
                householdMembersNamesArr.push(householdMembers[prop].name)
                console.log('this is the householdMembersNamesArr', householdMembersNamesArr)
            }
                $scope.houseMem1=householdMembersNamesArr[0];
                $scope.houseMem2=householdMembersNamesArr[1];
            console.log('this is houseMem1', $scope.houseMem1, 'this is houseMem2', $scope.houseMem2)
            console.log('woot!')
        })
    })
}

});
