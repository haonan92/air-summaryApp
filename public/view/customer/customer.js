app.controller("CustomerCtrl", function ($scope, $http, $rootScope, $location, $routeParams) {

    //current user 
    var currentUser = $rootScope.currentUser;


    //represent username
    console.log($rootScope.currentUser);


   

    $scope.submit = function (customer) {


            $http.post("/customer", customer)
                .success(function (response) {
                    $location.url("/profile");
                })
        }
    
    



});
