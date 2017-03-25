'use strict';

/**
 * @ngdoc directive
 * @name ngTestApp.directive:loginNav
 * @description
 * # loginNav
 */
angular.module('ngTestApp')
  .directive('loginNav', ['Auth', function (Auth) {
    return {
      templateUrl: 'views/auth/nav-login.html',
      controller: 'LoginCtrl as vm',
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$watch(function () {
          return Auth.token;
        }, function (newVal) {
          if (newVal) {
            element.hide();
          } else {
            scope.form.$setPristine();
            element.show();
          }
        });
      }
    };
  }]);
