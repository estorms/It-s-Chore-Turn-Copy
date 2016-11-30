// console.log('EditChoreCtrl connected')
// app.controller("EditChoreCtrl", function ($scope, ChoreFactory, $location, $window, $routeParams){

// })


"use strict";
console.log('EditChoreCtrl connected')
app.controller("EditChoreCtrl", function ($scope, ChoreFactory, $location, $window, $routeParams){

// console.log("choreId", chore.id)

let hId;
let houseID;
let householdMembersNamesArr = [];
let householdMembersArr=[];
$scope.chores = [];
let singleChore;
let choreId;
let singleMember;
let houseMem1ID;
let houseMem2ID;
let selectedMember;
let houseMemID;
let alreadyPoints;
let chorePointsNum;
let frequencyLimit;
let chorePoints;
$scope.thisChore = null;

$scope.$parent.getUser()
  .then ( (user) => {
    console.log('this is user returned by promise', user)
    hId = user;
    accesshousehold();
  })


$scope.title = "Add This Week's Chores";
$scope.btnText = "Save That Nasty Chore!";
$scope.selectedChore = {
    // name: '',
    // description: '',
    //when pushing to FB, was registering a blank string until you put in ng-model to the partial, now it's not registering at all as a key on selectedChore
    // assignedMember: '',
    // completed: false
    // completed: false,
    // timesCompleted: 0
};

$('select').material_select();
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 3 // Creates a dropdown of 3 years to control year
  });



var currentTime = new Date();
$scope.currentTime = currentTime;
$scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
$scope.disable = [false];
$scope.today = 'Today';
$scope.clear = 'Clear';
$scope.close = 'Close';
var days = 30;
$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24))).toISOString();
$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
$scope.onStart = function () {
    console.log('onStart');
};
$scope.onRender = function () {
    console.log('onRender');
};
$scope.onOpen = function () {
    console.log('onOpen');
};
$scope.onClose = function () {
    console.log('onClose');
};
$scope.onSet = function () {
    console.log('onSet');
};
$scope.onStop = function () {
    console.log('onStop');
};

let accesshousehold = () => {
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
            ChoreFactory.getSingleChore($routeParams.choreId)
            .then( (result) => {
            console.log('the result of getSingleChore', result)
            for (var key in result) {
                result = result[key]
            }
            console.log("result.name", result.name)
            $scope.thisChore = result
            // console.log('$scope.thisChore.name', $scope.thisChore.name)

            // ChoreFactory.getAllChores(houseID)
            // .then( (choresObj) => {
                // $scope.chores = choresObj;
            })
        })
    })
}
$scope.updateselectedChore =  () => {

    $scope.selectedChore.householdId = houseID;
    let memToToast = $scope.selectedChore.assignedMember;
    let choreToToast = $scope.selectedChore.name;
    let iPtoToast = $scope.selectedChore.irritationPoints;
    let frequencyToast = $scope.selectedChore.frequency;

         ChoreFactory.updateChore($routeParams.choreId, $scope.selectedChore)
        .then((result) => {
            console.log('wow! you posted a chore!', result);
                let selectedChoreToast = `<span> This chore has been updated!</span>`;
                Materialize.toast(selectedChoreToast, 3000);
        // })
     })
            // $scope.selectedChore = { completed: false } Don't think you need this, as you're not editing the same chore twice!
        $location.url('/allchores')
}

$scope.houseMem1Selected = () => {
    console.log('this is houseMem1', $scope.houseMem1)
    $scope.selectedChore.assignedMember = $scope.houseMem1;
    $scope.selectedChore.assignedMember != $scope.houseMem2;
    // console.log($scope.selectedChore)

}

$scope.houseMem2Selected = () => {
    console.log('this is houseMem2', $scope.houseMem2)
    $scope.selectedChore.assignedMember = $scope.houseMem2;
    $scope.selectedChore.assignedMember != $scope.houseMem1;
    // console.log($scope.selectedChore)

}



});




