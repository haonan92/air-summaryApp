app.controller("CustomerCtrl", function ($scope, $http, $rootScope, $location, $routeParams) {

    //current user 
    var currentUser = $rootScope.currentUser;


    //represent username
   // console.log($rootScope.currentUser);


   

    $scope.submit = function (customer) {
       // console.log(new Date(Date.parse(customer.back)).toUTCString().substring(0,10));
        if (customer.email == null) {
           return;
       }
       else {
            $http.post("/customer", customer)
                .success(function (response) {
                 //   console.log(response);
                    $location.url("/home");
                })
        }

            
        }
    
    



});
