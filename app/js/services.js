'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngRoute'])

.factory('UserService', function($rootScope, $http) {
  var service = {
  	login: function(user) {

  		var headers = user ? 
  			{authorization : "Basic " + btoa(user.email + ":" + user.password)} : {};

  		$http.get('http://mingcaouzhu.f3322.net:8080/reminder/api/user', { headers: headers })
      		.success(function (data) {
      			if (data.name) {
      				$rootScope.authenticated = true;
      			} else {
      				$rootScope.authenticated = false;
      			}
      		})
      		.error(function (data) {
      			$rootScope.authenticated = false;
      		});
  	}};
  return service;
})

.value('version', '0.1');
