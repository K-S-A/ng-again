'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('ProductsCtrl', ['Product',
    function (Product) {
      var vm = this;

      vm.products = Product.all;
    }
  ]);
