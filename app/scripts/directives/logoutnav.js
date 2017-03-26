'use strict';

/**
 * @ngdoc directive
 * @name ngTestApp.directive:logoutNav
 * @description
 * # logoutNav
 */
angular.module('ngTestApp')
  .directive('logoutNav', [function () {
    return {
      templateUrl: 'views/auth/nav-logout.html',
      controller: 'LoginCtrl as vm',
      restrict: 'A'
    };
  }]);
