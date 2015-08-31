'use strict';

angular.module('cyaF5App')
  .controller('BigipCtrl', function ($scope, $http, Auth, User, $location) {
    var bigips = {};

    $http.get('/api/bigips/')
        .success(function(res){
            $scope.bigips = res;
    });

    $scope.delete = function(bigip) {
        // TODO: No inherritance ofr 'Bigip', (ex like User)
        Bigip.remove({ id: bigip._id });
        angular.forEach($scope.bigips, function(u, i) {
          if ( u === bigip  ) {
              $scope.users.splice(i, 1);
          };
        });
    };

    $scope.edit = function(user) {
        $location.path('/bigips/' + user._id + '/edit');
    };
})
  .controller('BigipCreateCtrl', function ($scope, User, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createBigip({
          name: $scope.bigip.name,
          email: $scope.bigip.ipaddress,
          password: $scope.bigip.rootpassword
        })
        .then( function() {
          // Account created, redirect to user list
          $location.path('/bigips');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
})
  .controller('BigipEditCtrl', function ($scope, User, Auth, $location, $window, $http) {
    var path_array = window.location.pathname.split("/");
    var bigipid = path_array[2];
    $scope.bigip = {};
    $scope.errors = {};

    $http.get('/api/bigips/edit/' + bigipid)
        .success(function(res){
            $scope.bigip = res;
    });

    $scope.updateBigip = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
          Auth.modifyBigip({
            _id: $scope.bigip._id,
            name: $scope.bigip.name,
            email: $scope.bigip.address
          })
      }
  };
})
