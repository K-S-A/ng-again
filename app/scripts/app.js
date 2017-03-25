'use strict';

/**
 * @ngdoc overview
 * @name ngTestApp
 * @description
 * # ngTestApp
 *
 * Main module of the application.
 */
angular
  .module('ngTestApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngFlash',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as vm'
      })
      .state('register', {
        url: '/registration',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl as vm'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl as vm'
      });

      $urlRouterProvider.otherwise('/');
  }])
  .run(['$rootScope', '$state', 'Config', 'cookieStore', 'Auth',
    function ($rootScope, $state, Config, cookieStore, Auth) {
      $rootScope.$watch(function () {
        return Auth.token;
      }, function (newVal) {
        if (newVal && $state.current.name === 'register') {
          $state.go('root');
        }
      });

      Auth.updateHttpAuthHeader(cookieStore.get('token'));
      Auth.setCurrentUser(cookieStore.get('username'));
  }]);
