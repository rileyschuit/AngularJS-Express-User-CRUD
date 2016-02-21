'use strict';

angular.module('AngularJS-Express-User-CRUD')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/:userId/edit', {
         templateUrl: 'app/admin/edit-user.html',
         controller: 'EditCtrl'
      })
      .when('/admin/create', {
          templateUrl: 'app/admin/new-user.html',
          controller: 'CreateCtrl'
      });
  });
