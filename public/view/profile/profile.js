app.controller("ProfileCtrl", function ($scope, $http) {
    $http.get("/rest/customer")
    .success(function (customers) {
        $scope.customers = customers;
    });


    $scope.getinfo = function (id) {
        $http.get("/api/getcustomer/" + id)
        .success(function (response) {
            $scope.selected = response;
            //console.log($scope.selected);
        })
    }


    //for delete user
    $scope.remove = function (id) {
        $http.delete("/api/customer/" + id)
    .success(function (response) {
        $scope.customers = response;
    });
    }


    $scope.numLimit = 10;

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


    //search for targer user
    $scope.searchLabel = function () {
        //console.log($scope.customerSearch);
        $scope.labelTo = $scope.labelSearch;
        // console.log($scope.targetTo);
    }

   
    $scope.addlabel = function (id) {
        $http.get("/api/addlabel/" + id)
        .success(function (response) {
            $scope.customerid = response;
            console.log($scope.customerid);
        })
    }

    //update method
    $scope.update = function (newcustomer) {
        $http.put("/api/customer/" + $scope.customerid, newcustomer)
        .success(function (response) {
            $scope.customer = response;
           // console.log($scope.customer);
        })
    }

});