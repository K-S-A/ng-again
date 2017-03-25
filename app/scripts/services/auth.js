'use strict';

/**
 * @ngdoc service
 * @name ngTestApp.Auth
 * @description
 * # Auth
 * Factory in the ngTestApp.
 */
angular.module('ngTestApp')
  .factory('Auth', ['$http', 'cookieStore', 'Config',
    function ($http, cookieStore, Config) {
      var o;

      function register(username, password, callback) {
        _authorize('register/', { username: username, password: password }, callback);
      }

      function login(username, password, callback) {
        _authorize('login/', { username: username, password: password }, callback);
      }

      function logout(callback) {
        o.token = o.currentUser.username = undefined;

        if (typeof(callback) === 'function') {
          callback();
        }
      }

      function updateHttpAuthHeader(token) {
        if (!token) {
          delete $http.defaults.headers.common.Authorization;
          return;
        }

        $http.defaults.headers.common.Authorization = 'Token ' + token;
      }

      function _authorize(path, params, callback) {
        $http.post(Config.API_BASE_URL + path, params).then(function(response) {
          if (response.data.success) {
            o.token = response.data.token;
            o.currentUser.username = params.username;
          } else {
            o.message = response.data.message;
          }

          if (typeof(callback) === 'function') {
            callback(response.data);
          }
        });
      }

      o = {
        currentUser: { username: cookieStore.get('username') },
        token: cookieStore.get('token'),
        register: register,
        login: login,
        logout: logout,
        updateHttpAuthHeader: updateHttpAuthHeader
      };

      return o;
  }]);
