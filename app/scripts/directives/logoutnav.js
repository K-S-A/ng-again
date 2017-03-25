'use strict';

/**
 * @ngdoc directive
 * @name ngTestApp.directive:logoutNav
 * @description
 * # logoutNav
 */
angular.module('ngTestApp')
  .directive('logoutNav', ['Auth', function (Auth) {
    return {
      templateUrl: 'views/auth/nav-logout.html',
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$watch(function () {
          return Auth.token;
        }, function (newVal) {
          if (newVal) {
            scope.vm.username = Auth.currentUser.username;
            element.show();
          } else {
            scope.vm.username = null;
            element.hide();
          }
        });
      }
    };
  }]);
