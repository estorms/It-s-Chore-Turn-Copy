console.log("divorce factory connected")

app.factory("DivorceFactory", function($q, $http) {

"use strict";

// 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=divorce+lawyers+in+Nashville&key=AIzaSyC2nm9oOVtuV2ajAO6zBs95lgCrSDXJ0VI'

let GPAPI = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'

let key="AIzaSyC2nm9oOVtuV2ajAO6zBs95lgCrSDXJ0VI"

 let getLawyer = (queryString) => {

  return $q ( (resolve, reject) => {
    $http.get(`${GPAPI}query=${queryString}&key=${key}`)
    .success( (lawyersObj) => {
      console.log(lawyersObj)
      resolve(lawyersObj);
    })
    .error( (error) => {
      reject(error);
    });
  })
};

return {getLawyer}
});
