'use strict';

angular.module('cyaF5App')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $location) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.edit = function(user) {
        $location.path('/admin/edit/' + user._id);
    };
})
  .controller('CreateCtrl', function ($scope, User, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
          // role: $scope.user.role
        })
        .then( function() {
          // Account created, redirect to user list
          $location.path('/admin');
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
  .controller('EditCtrl', function ($scope, User, Auth, $location, $window, $http) {
    var userid = window.location.pathname.split("/");

    $scope.user = {};
    $scope.errors = {};

    $http.get('/api/users/' + userid[3] + '/info')
        .success(function(res){
            $scope.user = res;
    });

    $scope.updateUser = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
          Auth.modifyUser({
            name: $scope.user.name,
            email: $scope.user.email,
            // password: $scope.user.password
            // role: $scope.user.role
          })
        .then( function() {
          $scope.message = 'User updated.';
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
        });
      }
  };
})
