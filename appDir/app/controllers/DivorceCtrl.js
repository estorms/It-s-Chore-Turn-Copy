console.log('DivorceCtrl connected')

app.controller("DivorceCtrl", function ($scope, DivorceFactory, $location) {

$scope.getDivorce = function () {
    console.log('you clicked getDivorce')
    DivorceFactory.getLawyer('divorce'+'lawyers'+'in'+ 'Nashville')
    .then((results) => {
        console.log(results)
    })
}
})

