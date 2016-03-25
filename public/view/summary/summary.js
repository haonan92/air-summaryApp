app.controller("SummaryCtrl", function ($scope, $http, $rootScope, $location, $routeParams) {
    $http.get("/rest/customer")
        .success(function (customers) {
            $scope.customers = customers;
        });
    //current user 
    var currentUser = $rootScope.currentUser;
    username = $routeParams.username;

    //represent username
    //console.log($rootScope.currentUser);
    console.log($routeParams.username);



    $scope.searchCustomer = function () {
        //console.log($scope.customerSearch);
        $scope.targetuser = $routeParams.username;
        //console.log($scope.targetuser);
    }

});
