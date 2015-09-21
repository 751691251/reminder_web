'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters',
    'myApp.controllers',
    'myApp.services',
    'myApp.constants',
    'myApp.directives',
    'ngRoute',
    'ngMessages',
    'ui.router',
    'LocalStorageModule',
    'http-auth-interceptor',
    //'fundoo.services',
    'csrf-cross-domain'
  ])
  .config(['$routeProvider', '$httpProvider', '$stateProvider', 'localStorageServiceProvider',
    function($urlRouterProvider, $httpProvider, $stateProvider, localStorageServiceProvider) {

      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'partials/template.html',
          controller: 'appController'
        })

      .state('app.home', {
        url: '/home',
        views: {
          'page': {
            templateUrl: "partials/home.html",
            controller: 'HomeController'
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'page': {
            templateUrl: "partials/login.html",
            controller: 'LoginController'
          }
        }
      })

      .state('app.about', {
        url: '/about',
        views: {
          'page': {
            templateUrl: "partials/about.html",
            controller: 'AboutController'
          }
        }
      })

      .state('app.myreminder', {
        url: '/myreminder',
        views: {
          'page': {
            templateUrl: "partials/my-reminders.html",
            controller: 'MyReminderController'
          }
        }
      })


      .state('app.createreminder', {
        url: '/createreminder',
        views: {
          'page': {
            templateUrl: "partials/create-reminder.html",
            controller: 'CreateReminderController'
          }
        }
      })


      ;

      $urlRouterProvider.otherwise('/app/home');

      //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $httpProvider.defaults.xsrfCookieName = "CSRF-TOKEN";
      $httpProvider.defaults.xsrfHeaderName = "X-CSRF-TOKEN";
      localStorageServiceProvider
        .setPrefix('reminder');

    }
  ])


.run(function($location, $rootScope, localStorageService) {
  // $rootScope.username = "Guest";

  $rootScope.$on('$locationChangeStart', function(event, next, current) {

    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
    //var loggedIn = $rootScope.globals.currentUser;
    //console.log("logedin is " + cookieStore.get('loggedIn'));
    if (restrictedPage && localStorageService.get('authenticated') !== true) {
      console.log("in log in");
      //$location.path('/login');
    }
  });



  $rootScope.$on('event:auth-loginRequired', function() {
    console.log("in log idn");
    $location.path('/app/login');
  });

  $rootScope.$on('event:auth-forbidden', function() {
    console.log("in log in");
    $location.path('/app/login');
  });
  /*
    if ($cookieStore.get('loggedIn') !== true) {
      $rootScope.$broadcast('event:auth-loginRequired');
    }*/

  if (localStorageService.get('authenticated') !== true) {
    $rootScope.$broadcast('event:auth-loginRequired');
  }


});