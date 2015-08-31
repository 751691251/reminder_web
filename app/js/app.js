'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 
						'myApp.controllers', 
						'myApp.services', 
						'myApp.constants',
						'myApp.directives', 'ngRoute']).
  config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
    	.when('/', 
    		{templateUrl: 'partials/home.html', controller: 'HomeController'})
    	.when('/login', 
    		{templateUrl: 'partials/login.html', controller: 'LoginController'})
    	.when('/register', 
    		{templateUrl: 'partials/register.html', controller: 'RegisterController'})
    	.when('/myreminder', 
    		{templateUrl: 'partials/my-reminders.html', controller: 'MyReminderController'})

    	.otherwise({redirectTo: '/'});

     $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  }]);
