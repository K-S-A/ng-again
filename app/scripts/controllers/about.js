'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('AboutCtrl', function () {
    var vm = this;

    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    return vm;
  });
