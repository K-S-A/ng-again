'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('ProductsCtrl', ['$state', 'Product',
    function ($state, Product) {
      var vm = this;

      vm.products = Product.all;
      vm.currentProduct = Product.get($state.params.id);

      vm.prevProductId = function () {
        return Product.prevProduct(vm.currentProduct).id;
      };

      vm.nextProductId = function () {
        return Product.nextProduct(vm.currentProduct).id;
      };
    }
  ]);
