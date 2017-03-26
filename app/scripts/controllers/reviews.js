'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:ReviewsCtrl
 * @description
 * # ReviewsCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('ReviewsCtrl', ['$scope', '$stateParams', 'Review', 'FlashProvider',
    function ($scope, $stateParams, Review, FlashProvider) {
      var vm = this;

      vm.review = { rate: 0 };
      vm.reviews = Review.all;

      vm.reset = function () {
        vm.review.text = '';
        vm.review.rate = 0;
        vm.loading = false;
        $scope.reviewForm.$setPristine();
      };

      vm.create = function () {
        vm.loading = true;

        Review.create(vm.review, {productId: $stateParams.id}, function () {
          vm.reset();
        }, function(err) {
          vm.loading = false;
          FlashProvider.create('serverError', err.data && err.data.message);
        });
      };
    }
  ]);
