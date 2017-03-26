'use strict';

/**
 * @ngdoc directive
 * @name ngTestApp.directive:loginNav
 * @description
 * # loginNav
 */
angular.module('ngTestApp')
  .directive('loginNav', [function () {
    return {
      templateUrl: 'views/auth/nav-login.html',
      controller: 'LoginCtrl as vm',
      restrict: 'A'
    };
  }]);
