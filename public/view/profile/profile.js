app.controller("ProfileCtrl", function ($scope, $http) {
    $http.get("/rest/customer")
    .success(function (customers) {
        $scope.customers = customers;
    });


    //for delete user
    $scope.remove = function (id) {
        $http.delete("/api/customer/" + id)
    .success(function (response) {
        $scope.customers = response;
    });
    }

    /*
    //search for targer user
    $scope.searchCustomer = function () {
        //console.log($scope.customerSearch);
        $scope.targetuser = $scope.customerSearch;
        //console.log($scope.targetuser);
    }
    */

    $scope.searchEmail = function () {
        //console.log($scope.customerSearch);
        $scope.useremail = $scope.emailSearch;
        //console.log($scope.targetuser);
    }

    //search for targer user
    $scope.searchTo = function () {
        //console.log($scope.customerSearch);
        $scope.targetTo = $scope.toSearch;
       // console.log($scope.targetTo);
    }

   

});