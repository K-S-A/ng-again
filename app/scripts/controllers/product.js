'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('ProductCtrl', ['$stateParams', 'Product',
    function ($stateParams, Product) {
      var vm = this;

      vm.currentProduct = Product.get($stateParams.id);
      vm.prevProductId = Product.prevProduct(vm.currentProduct).id;
      vm.nextProductId = Product.nextProduct(vm.currentProduct).id;
    }
]);
