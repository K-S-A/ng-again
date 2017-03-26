'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('RegisterCtrl', ['$state', 'FlashProvider', 'Auth',
    function ($state, FlashProvider, Auth) {
      var vm = this;

      vm.register = function () {
        vm.loading = true;

        Auth.register(vm.username, vm.password, function (data) {
          vm.loading = false;

          if (data.success) {
            $state.go('products');
            FlashProvider.create('register');
          } else {
            FlashProvider.create('registerError', data.message);
          }
        });
      };
  }]);
