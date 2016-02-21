'use strict';

angular.module('AngularJS-Express-User-CRUD')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      edit: {
          method: 'PUT',
          params: {
              controller:'edit'
          }
      }
    });
  });
