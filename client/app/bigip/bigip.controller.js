'use strict';

angular.module('cyaF5App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create', {
        templateUrl: 'app/bigip/create.html',
        controller: 'CreateCtrl'
      })
  });