'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LoginController', function($rootScope, $scope, $http, $location, UserService, AUTH_EVENTS) {

$scope.user = {};

$scope.submit = function (user) {
	UserService.login(user).then(function() {
		if ($rootScope.authenticated) {
		console.log("authenticated");
		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		$location.path("/myreminder");
		}
	}, function (){
		$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	});
	
};

})
.controller('RegisterController', function() {
	
})

.controller('HomeController', function() {
	
})

.controller('MyReminderController', function() {
	
})
;
