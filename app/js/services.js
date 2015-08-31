'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngRoute', 'ngResource'])

.factory('UserService', function($rootScope, $http, $resource, $q) {
  var service = {
  	login: function(user) {

      return $q(function(resolve, reject) {
        var headers = user ? 
        {authorization : "Basic " + btoa(user.email + ":" + user.password)} : {};

      $http.get('http://mingcaouzhu.f3322.net:8080/reminder/api/user', { headers: headers })
          .success(function (data) {
            if (data.name) {
              $rootScope.authenticated = true;
              resolve("success");
            } else {
              $rootScope.authenticated = false;
              reject("failed");
            }
          })
          .error(function (data) {
            $rootScope.authenticated = false;
            reject("failed");
          });
      });
  	}};
  return service;
})

.value('version', '0.1');
