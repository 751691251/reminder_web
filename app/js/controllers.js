'use strict';

/* Controllers */

angular.module('myApp.controllers', ['http-auth-interceptor', 'ngCookies'])

.controller('LoginController', function($rootScope, $scope, $http,
		$location, $state, UserService, authService, localStorageService) {

		$scope.user = {};
		$scope.showButton = true;
		$scope.message = "";

		$scope.submit = function(user) {
			console.log('in submit');
			UserService.login(user).then(function() {
				//$cookieStore.put('loggedIn', 'true');
				localStorageService.set('authenticated', true);
				authService.loginConfirmed();
				$state.go('app.home', {}, {
					reload: true
				});
			}, function() {
				localStorageService.set('authenticated', false);
				//$cookieStore.put('loggedIn', 'false');
				//authService.loginFailed();
			});

		};
		$scope.logout = function() {
			console.log("in log out");
			$http.post('http://mingcaouzhu.f3322.net:8080/reminder/logout', {}).success(function() {
				// $http.post('http://localhost:8080/reminder/logout', {}).success(function() {
				$rootScope.authenticated = false;
				console.log("log out");
				$location.path("/");
			}).error(function(data) {
				$rootScope.authenticated = false;
			});
		};



		$scope.register = function(email) {
			console.log("email is " + email);
			UserService.register(email).then(function() {
				//$state.go('app.home', {}, {reload : true});
				$scope.showButton = false;
				console.log("success");
				$scope.message = "Please check your mailbox";
			}, function() {
				console.log("failed");
				$scope.message = "failed with error";
			});
		};

	})
	.controller('RegisterController', function() {

	})

.controller('appController', function($scope, $state, $http, localStorageService) {

	$scope.username = localStorageService.get("username");
	$scope.loggedIn = localStorageService.get("authenticated");


	$scope.login = function() {
		$state.go('app.login');
	};

	$scope.logout = function() {

		$http.post('http://mingcaouzhu.f3322.net:8080/reminder/logout', {}).success(function() {
			//$http.post('http://localhost:8080/reminder/logout', {}).success(function() {
			//$rootScope.authenticated = false;
			//delete $http.defaults.headers.common['Authorization'];
			//console.log("log out");
			$state.go('app.home');
		}).error(function(data) {
			//$rootScope.authenticated = false;
			//delete $http.defaults.headers.common['Authorization'];
		});
		delete $http.defaults.headers.common['Authorization'];
		localStorageService.set('authenticated', false);
	};

})

.controller('HomeController', function($scope, $http, $rootScope, $location, localStorageService) {



})

.controller('MyReminderController', function($scope, ReminderRequest, localStorageService) {

	$scope.data = {};
	ReminderRequest.myReminders({
		owner: localStorageService.get("username")
	}, function(data, responseHeaders) {
		$scope.data = data;
		console.log(data);
	}, function(httpResponse) {
		console.log(httpResponse);
	});

})

.controller('AboutController', function($scope, ReminderRequest, $rootScope) {



})

.controller('CreateReminderController', function($scope, ReminderRequest, $rootScope, localStorageService) {

	$scope.request = {
		owner: localStorageService.get("username")
	};

	$scope.create = function(request) {
		//delete request.daily;
		console.log(request);
	};
})

;