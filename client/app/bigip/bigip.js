'use strict';

angular.module('cyaF5App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bigip', {
        templateUrl: 'app/bigip/bigip.html',
        controller: 'BigipCtrl'
      })
      .when('/bigip/:userId/edit', {
         templateUrl: 'app/bigip/edit-bigip.html',
         controller: 'BigipEditCtrl'
      })
      .when('/bigip/create', {
          templateUrl: 'app/bigip/new-bigip.html',
          controller: 'BigipCreateCtrl'
      });
  });
