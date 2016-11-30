"use strict";
app.factory("ChoreFactory", ($q, $http, FirebaseURL) => {

let postNewChore = (newChore) => {
    return $q( (resolve, reject) => {
        $http.post(`${FirebaseURL}/chores.json`, JSON.stringify(newChore))
        .success( (ChoreFromFB) => {
            resolve(ChoreFromFB);
        })
        .error ((error) => {
            reject(error);
        });
    });
};

let addNewHouse = (newHouse) => {

    return $q((resolve, reject) =>{
        $http.post(`${FirebaseURL}/households.json`, JSON.stringify(newHouse))
        .success((householdFromFB) =>{
            resolve(householdFromFB);
        })
        .error((error) =>{
            reject(error);
        });
    });
};

let addMember = (member) => {

    return $q((resolve, reject) =>{
        $http.post(`${FirebaseURL}/members.json`,
            JSON.stringify(member))
        .success((data)=>{
            resolve(data);
        })
        .error((error) =>{
            reject(error);
        });
    });
};

let getHouseholdMembers = (housekey) => {
  let members = [];
  return $q ( (resolve, reject) => {
    $http.get(`${FirebaseURL}/members.json?orderBy="houseId"&equalTo="${housekey}"`)
    .success( (membersObj) => {
      console.log(membersObj)
      Object.keys(membersObj).forEach((key) =>{
        membersObj[key].id = key;
        members.push(membersObj[key]);
      })
      console.log('these are members from inside getHouseholdMembers', members)
      resolve(members);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let updateHouseholdMembers = (housekey, editedMembers) => {
  let members = [];
  return $q ( (resolve, reject) => {
    $http.patch(`${FirebaseURL}/members.json?orderBy="houseId"&equalTo="${housekey}"`,  JSON.stringify(editedMembers))
    .success( (membersObj) => {
      // console.log(membersObj)
      console.log('these are members from inside getHouseholdMembers', members)
      resolve(members);
    })
    .error( (error) => {
      reject(error);
    });
  });
};



let getAllChores = (householdId) => {
  let chores = [];
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseURL}/chores.json?orderBy="householdId"&equalTo="${householdId}"`)
    .success((choresObj) => {
        console.log(choresObj)
      Object.keys(choresObj).forEach((key) => {
        choresObj[key].id = key;
        chores.push(choresObj[key]);
      });
      // console.log(chores)
    resolve(chores);
    })
    .error((error) => {
      reject(error);
    });
  });
};

let getHouseholdId = (householdId) =>{
    // let houseId = [];
    let houseId;
    // let householdName;
    return $q ( (resolve, reject) => {
    $http.get(`${FirebaseURL}/households.json?orderBy="userId"&equalTo="${householdId}"`)
    .success( (household) => {
        console.log('in getHouseholdId', household)
       // for (var prop in household) {
       //  console.log('prop in household', household[prop])
       //   householdName = household[prop].name
       //  console.log('this is the name you want to try to resolve', householdName)
       // }
        Object.keys(household).forEach((key) => {
             household[key].id = key;
             // houseId.push(household[key])
             houseId = key
        });
      resolve(houseId);

    })
    .error( (error) => {
      reject(error);
    });
  })
}

let getHouseholdName = (householdId) =>{
  let householdName;
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseURL}/households.json?orderBy="userId"&equalTo="${householdId}"`)
    .success((household) =>{
    resolve(household)
    })
  })
}

let updateChore = (choreId, editedChore) => {
  return $q ( (resolve, reject) => {
    $http.patch(`${FirebaseURL}/chores/${choreId}.json`, JSON.stringify(editedChore))
    .success( (choreObj) => {
      resolve(choreObj);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let updateMember = (memberId, editedMember) => {
  return $q ( (resolve, reject) => {
    $http.patch(`${FirebaseURL}/members/${memberId}.json`, JSON.stringify(editedMember))
    .success( (result) => {
      // console.log('result of updateMember', result)
      resolve(result);
    })
    .error( (error) => {
      reject(error);
    });
  });
};


// https://its-chore-turn.firebaseio.com/chores.json?orderBy="id"&equalTo="-KRo5GfJFXBXREM7hyMX"



let getSingleChore = (choreId) => {
  return $q ((resolve, reject) =>{
    $http.get(`${FirebaseURL}/chores.json?orderBy="id"&equalTo="${choreId}"`)
    .success((choreObj) =>{
      console.log('this is the result of getSingleChore', choreObj)
      resolve(choreObj)
    })
    .error((error) =>{
      reject(error);
    })
  })
};

let getSingleMember = (id) => {
  return $q ((resolve, reject) =>{
    $http.get(`${FirebaseURL}/members.json?orderBy="id"&equalTo="${id}"`)
    .success((memberObj) =>{
      console.log('this is the result of getSingleMember', memberObj)
      resolve(memberObj)
    })
    .error((error) =>{
      reject(error);
    })
  })
};

let updateSingleMember = (memberId, editedMember) => {
  return $q ( (resolve, reject) => {
    $http.patch(`${FirebaseURL}/members/${memberId}.json`, JSON.stringify(editedMember))
    .success( (memberObj) => {
      // console.log('this is the result of updateSingleMember', memberObj)
      resolve(memberObj);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let deleteAChore = (choreId) => {
  return $q ( (resolve, reject) => {
    $http.delete(`${FirebaseURL}/chores/${choreId}.json`)
    .success( (response) => {
        console.log('this is the response from delete a chore', response)
      resolve(response);
    })
    .error( (error) => {
      reject(error);
    });
  });
};
return {postNewChore, addNewHouse, addMember, getHouseholdMembers, getHouseholdId, getAllChores, deleteAChore, updateChore, getSingleChore, updateMember, getSingleMember, updateSingleMember, getHouseholdName, updateHouseholdMembers}

});
