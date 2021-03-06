'use strict';

angular.module('AngularJS-Express-User-CRUD')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $location) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      if (user.role === 'user') {
        User.remove({ id: user._id });
        angular.forEach($scope.users, function(u, i) {
          if ( u === user  ) {
              $scope.users.splice(i, 1);
          };
        });
      } else {
        alert("You can not delete the admin account.");
      };
    };

    $scope.edit = function(user) {
        $location.path('/admin/' + user._id + '/edit');
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
    var path_array = window.location.pathname.split("/");
    var userid = path_array[2];
    $scope.user = {};
    $scope.errors = {};

    $http.get('/api/users/edit/' + userid)
        .success(function(res){
            $scope.user = res;
    });

    $scope.updateUser = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
          Auth.modifyUser({
            _id: $scope.user._id,
            name: $scope.user.name,
            email: $scope.user.email
          })
      }
  };
})
