'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:ReviewsCtrl
 * @description
 * # ReviewsCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('ReviewsCtrl', ['Review', function (Review) {
    var vm = this;

    vm.reviews = Review.all;
    // vm.reviews = Review.query({productId: $state.params.id});
  }]);
