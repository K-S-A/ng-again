'use strict';

/**
 * @ngdoc service
 * @name ngTestApp.FlashProvider
 * @description
 * # FlashProvider
 * Factory in the ngTestApp.
 */
angular.module('ngTestApp')
  .factory('FlashProvider', ['Config', 'Flash', function (Config, Flash) {
    var o = this;

    o._login = function (message) {
      _flash('success', message || Config.MESSAGES.ON_LOGIN);
    };

    o._loginError = function (message) {
      _flash('danger', message || Config.MESSAGES.ON_LOGIN_ERROR);
    };

    o._register = function (message) {
      _flash('success', message || Config.MESSAGES.ON_REGISTER);
    };

    o._registerError = function (message) {
      _flash('danger', message || Config.MESSAGES.ON_REGISTER_ERROR);
    };

    o._logout = function (message) {
      _flash('success', message || Config.MESSAGES.ON_LOGOUT);
    };

    o._serverError = function (message) {
      _flash('danger', message || Config.MESSAGES.ON_SERVER_ERROR);
    };

    function _flash(type, message) {
      Flash.clear();
      Flash.create(type, message);
    }

    return {
      create: function (event, message) {
        return o['_' + event](message);
      }
    };
  }]);
