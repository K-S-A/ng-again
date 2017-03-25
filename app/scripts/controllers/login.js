'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('LoginCtrl', ['FlashProvider', 'Auth', function (FlashProvider, Auth) {
    var vm = this;

    vm.login = function () {
      vm.loading = true;

      Auth.login(vm.username, vm.password, function (data) {
        vm.loading = false;

        if (data.success) {
          vm.username = vm.password = null;
          FlashProvider.create('login');
        } else {
          FlashProvider.create('loginError', data.message);
        }
      });
    };

    vm.logout = function () {
      Auth.logout();
      FlashProvider.create('logout');
    };
  }]);
