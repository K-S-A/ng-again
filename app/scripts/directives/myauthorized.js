'use strict';

/**
 * @ngdoc directive
 * @name ngTestApp.directive:myAuthorized
 * @description
 * # myAuthorized
 */
angular.module('ngTestApp')
  .directive('myAuthorized', ['Auth', function (Auth) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var auth = attrs.myAuthorized === 'true';

        scope.$watch(function () {
          return Auth.token;
        }, function (newVal) {
          if (Boolean(newVal) === auth) {
            element.show();
          } else {
            element.hide();
          }
        });
      }
    };
  }]);
