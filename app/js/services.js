'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngRoute', 'ngResource'])

.factory('UserService', function($rootScope, $http, $resource, $q, localStorageService) {
  var service = {
    login: function(user) {

      return $q(function(resolve, reject) {
        var headers = user ? {
          authorization: "Basic " + btoa(user.email + ":" + user.password)
        } : {};
        $http.defaults.headers.common['Authorization'] = "Basic " + btoa(user.email + ":" + user.password);

        $http.get('http://mingcaouzhu.f3322.net:8080/reminder/api/user', {
            headers: headers
          })
          // $http.get('http://localhost:8080/reminder/api/user', { headers: headers })
          .success(function(data) {
            if (data.name) {
              localStorageService.set('username', data.name);
              // console.log("success");
              resolve("success");
            } else {
              reject("failed");
              // console.log("failed");
            }
          })
          .error(function(data) {
            // $rootScope.authenticated = false;
            reject("failed");
          });
      });
    },
    register: function(email) {
      return $q(function(resolve, reject) {
        $http.post("http://mingcaouzhu.f3322.net:8080/reminder/api/user/register", {
            user: email
          })
          .success(function(data) {
            resolve(data);
          })
          .error(function(data) {
            reject("failed");
          });
      });
    }

  };
  return service;
})



.factory('ReminderRequest', function($resource, $q) {
  return $resource('http://mingcaouzhu.f3322.net:8080/reminder/api/reminder/request/id/:id',
    //$resource('http://localhost:8080/reminder/api/reminder/request/id/:id',
    {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      },
      myReminders: {
        method: 'GET',
        url: 'http://mingcaouzhu.f3322.net:8080/reminder/api/reminder/request/owner/:owner/',
        // 'http://localhost:8080/reminder/api/reminder/request/owner/:owner/',
        params: {
          owner: '@owner'
        },
        isArray: true,
        withCredentials: true
      }
    }, {
      stripTrailingSlashes: false
    });
})


.value('version', '0.1');