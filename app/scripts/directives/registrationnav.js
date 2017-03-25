'use strict';

/**
 * @ngdoc directive
 * @name ngTestApp.directive:registrationNav
 * @description
 * # registrationNav
 */
angular.module('ngTestApp')
  .directive('registrationNav', ['Auth', function (Auth) {
    return {
      template: '<a ui-sref="register">Registration</a>',
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$watch(function () {
          return Auth.token;
        }, function (newVal) {
          if (newVal) {
            element.hide();
          } else {
            element.show();
          }
        });
      }
    };
  }]);
