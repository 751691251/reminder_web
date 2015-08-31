'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LoginController', function($rootScope, $scope, $http, $location, UserService) {

$scope.user = {};

$scope.submit = function (user) {
	UserService.login(user);
	if ($rootScope.authenticated) {
		console.log("authenticated");
		$location.path("/myreminder");
	}
};

})
.controller('RegisterController', function() {
	
})

.controller('HomeController', function() {
	
})

.controller('MyReminderController', function() {
	
})
;
