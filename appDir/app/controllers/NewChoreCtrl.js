"use strict";
console.log('NewChoreCtrl connected')
app.controller("NewChoreCtrl", function ($scope, ChoreFactory, $location, $window){

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
let householdMembersObj;
let householdMembersIdsArr = [];


$scope.$parent.getUser()
  .then ( (user) => {
    console.log('this is user returned by promise', user)
    hId = user;
    accesshousehold();
  })


$scope.title = "Add This Week's Chores";
$scope.btnText = "Save That Nasty Chore!";
$scope.newChore = {
    name: '',
    description: '',
    //when pushing to FB, was registering a blank string until you put in ng-model to the partial, now it's not registering at all as a key on newChore
    assignedMember: '',
    // completed: false
    completed: false,
    timesCompleted: 0
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
            // householdMembersObj = householdMembers

            console.log('you are inside accesshousehold', householdMembers)
            for (var prop in householdMembers) { //householdMembers is an object full of other objects. Prop is the name of each internal object (in this case, the 'name' = FB returned numeric value)
                // console.log('hello');
                console.log(householdMembers[prop].name) //here, we are inside *each* object, regardless of its name (aka top-levelprop) and as identified by houseMembers[prop], and accessing a property specific to that object with dot notation. We have to use brackets on "prop" b/c we are access more than one object.
                householdMembersNamesArr.push(householdMembers[prop].name)
                householdMembersIdsArr.push(householdMembers[prop].id)
                householdMembersArr.push(householdMembers[prop])
                console.log('this is the householdMembersNamesArr', householdMembersNamesArr)
            }
                $scope.houseMem1=householdMembersNamesArr[0];
                $scope.houseMem2=householdMembersNamesArr[1];
                houseMem1ID = householdMembersIdsArr[0];
                houseMem2ID = householdMembersIdsArr[1];

            console.log('this is houseMem1ID', houseMem1ID, 'this is houseMem2ID', houseMem2ID)
            // console.log('woot!')
        })
    })
}
$scope.addNewChore =  () => {

    $scope.newChore.householdId = houseID;
    let memToToast = $scope.newChore.assignedMember;
    let choreToToast = $scope.newChore.name;
    let iPtoToast = $scope.newChore.irritationPoints;
    let frequencyToast = $scope.newChore.frequency;
    ChoreFactory.postNewChore($scope.newChore)
        .then((result) => {
            console.log('wow! you posted a chore!', result);
            $scope.newChore = { completed: false, timesCompleted: 0 };
                let newChoreToast = `<span>${memToToast} has been assigned ${choreToToast}, worth ${iPtoToast} points, ${frequencyToast} times this week! Wow!</span>`;
                Materialize.toast(newChoreToast, 3000);
     });

}

$scope.houseMem1Selected = () => {
    console.log('this is houseMem1', $scope.houseMem1)
    $scope.newChore.assignedMember = $scope.houseMem1;
    $scope.newChore.assignedMember != $scope.houseMem2;
    // console.log($scope.newChore)

}

$scope.houseMem2Selected = () => {
    console.log('this is houseMem2', $scope.houseMem2)
    $scope.newChore.assignedMember = $scope.houseMem2;
    $scope.newChore.assignedMember != $scope.houseMem1;
    // console.log($scope.newChore)

}

$scope.reset = () => {
    console.log('householdMembersArr', householdMembersArr)
    householdMembersArr.forEach((member) =>{
        member.pointsEarned = 0
        // ChoreFactory.upddateMember
    })
    ChoreFactory.updateMember(houseMem1ID, householdMembersArr[0])
    .then((result) => {console.log(result)
         ChoreFactory.updateMember(houseMem2ID, householdMembersArr[1])
        .then((result) => {console.log(result)
        })
        let resetToast= `<span>Both members' points have been reset to zero! Welcome to the next round!</span>`
        Materialize.toast(resetToast, 3000)
    // console.log(householdMembersArr, 'householdMembersArr after points shifted')
    })
}



});




