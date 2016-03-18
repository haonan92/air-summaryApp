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
});