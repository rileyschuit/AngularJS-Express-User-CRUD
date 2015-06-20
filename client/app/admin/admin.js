'use strict';

angular.module('cyaF5App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/edit/:userId', {
         templateUrl: 'app/admin/edit-user.html',
         controller: 'AdminEditUser'
      })
      .when('/admin/create', {
          templateUrl: 'app/admin/new-user.html',
          controller: 'CreateCtrl'
      });
  });
