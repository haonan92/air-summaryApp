app.controller("CustomerCtrl", function ($scope, $http, $rootScope, $location) {


    $scope.submit = function (customer) {
        $http.post("/customer", customer)
        .success(function (response) {
            $location.url("/profile");
        })
    }
        
});