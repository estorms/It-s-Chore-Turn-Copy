"use strict";

app.controller("ChoreTurnCtrl", function ($scope, ChoreFactory, $routeParams, $window, $location) {
    // $scope.bgimg = "http://img.wikinut.com/img/19hgv38l3mly4kn3/jpeg/0/Happy-Couple.jpeg";
$scope.bgimg = '/7034829-beautiful-black-white-photography.jpg'

let hId;
let houseID;
let householdMembersNamesArr = [];
let householdMembersArr=[];
$scope.choresArr = [];
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
let mem1Chores = [];
let mem2Chores= [];
let mem1totalPoints = 0;
let mem2totalPoints = 0;
$scope.houseMem1 = null;

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
                householdMembersArr.push(householdMembers[prop])
                householdMembersNamesArr.push(householdMembers[prop].name)
                console.log('this is the householdMembersNamesArr', householdMembersNamesArr)
            }
                $scope.houseMem1=householdMembersNamesArr[0];
                $scope.houseMem2=householdMembersNamesArr[1];
            console.log('this is houseMem1', $scope.houseMem1, 'this is houseMem2', $scope.houseMem2)
            console.log('woot!')
            console.log('hId', hId, 'houseID', houseID)
            ChoreFactory.getAllChores(houseID)
            .then((choresObj) => {
                choresObj.forEach(function(chore){
                    if (chore.assignedMember === $scope.houseMem1){
                        console.log('we have a housemem1', $scope.houseMem1)
                        mem1Chores.push(chore)
                    }
                    else {
                       mem2Chores.push(chore)
                    }
                    console.log('these are mem1Chores', mem1Chores, 'these are mem2Chores', mem2Chores)
                })
                // console.log('you have hte chores from second call, with the misspelling', choresObj)
                for(var i = 0; i < mem1Chores.length; i++){
                    // let totalPoints;
                    mem1totalPoints = mem1totalPoints + parseInt(mem1Chores[i].irritationPoints)
                }

                for(var i = 0; i < mem2Chores.length; i++){
                    // let totalPoints;
                    mem2totalPoints = mem2totalPoints + parseInt(mem2Chores[i].irritationPoints)
                }

                console.log('mem1totalPoints', mem1totalPoints, 'mem2totalPoints', mem2totalPoints)

                $scope.choresArr= choresObj;

                // console.log("this is the chores array", $scope.choresArr)

            })
        })
    })
}

$scope.showPoints = () => {
  let houseMem1PointstoDate = householdMembersArr[0].pointsEarned
  let houseMem2PointstoDate = householdMembersArr[1].pointsEarned
  let houseMem1Name = householdMembersNamesArr[0];
  let houseMem2Name = householdMembersNamesArr[1];
  let showPointsToast = `<span><h5>${houseMem1Name} has ${houseMem1PointstoDate} points. ${houseMem2Name} has ${houseMem2PointstoDate} points.</h5></span>`
  Materialize.toast(showPointsToast, 2500)
}

$scope.choreTurn = () => {
  let houseMem1PointstoDate = householdMembersArr[0].pointsEarned
  console.log(houseMem1PointstoDate)
  let houseMem2PointstoDate = householdMembersArr[1].pointsEarned
  let houseMem1Name = householdMembersNamesArr[0];
  console.log(houseMem2PointstoDate)
  let houseMem2Name = householdMembersNamesArr[1];
  let pointsAhead;
  let choreTurnToast;

  if (houseMem1PointstoDate > houseMem2PointstoDate) {
    console.log(houseMem1Name, 'wins!')
    pointsAhead = houseMem1PointstoDate - houseMem2PointstoDate;
    choreTurnToast = `<span><h5>${houseMem1Name} has ${pointsAhead} more points to date than ${houseMem2Name}. You're on the hook, ${houseMem2Name}</h5></span>`

  }
    else if (houseMem2PointstoDate > houseMem1PointstoDate) {
      console.log(houseMem2Name, 'wins')
      pointsAhead = houseMem2PointstoDate - houseMem2PointstoDate;
      choreTurnToast = `<span><h5>${houseMem2Name} has ${pointsAhead} more points to date than ${houseMem1Name}. You're on the hook, ${houseMem1Name}</h5></span>`

    }
    else {
      console.log('your points are identical. Looks like you need a divorce lawyer')
      choreTurnToast = `<span><h5>Your points are identical. Looks like you need a divorce lawyer</h5></span>`
    }
    Materialize.toast(choreTurnToast, 4000)
}

$scope.isThisFair = () => {
    if (mem2totalPoints > mem1totalPoints){
        console.log('mem2 is ahead')
    }

    else {
        console.log('totally unfair!')
    }

    }

})
