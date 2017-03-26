'use strict';

/**
 * @ngdoc function
 * @name ngTestApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngTestApp
 */
angular.module('ngTestApp')
  .controller('LoginCtrl', ['$scope', 'FlashProvider', 'Auth', function ($scope, FlashProvider, Auth) {
    var vm = this;

    vm.currentUser = Auth.currentUser;

    vm.login = function () {
      vm.loading = true;

      Auth.login(vm.username, vm.password, function (data) {
        vm.loading = false;

        if (data.success) {
          vm.username = vm.password = null;
          $scope.form.$setPristine();
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
