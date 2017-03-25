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
        _setToken();
        setCurrentUser();

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

      function setCurrentUser(username) {
        cookieStore.put('username', username);
        o.currentUser.username = username;
      }

      function _authorize(path, params, callback) {
        $http.post(Config.API_BASE_URL + path, params).then(function(response) {
          if (response.data.success) {
            _setToken(response.data.token);
            setCurrentUser(params.username);
          } else {
            o.message = response.data.message;
            logout();
          }

          if (typeof(callback) === 'function') {
            callback(response.data);
          }
        });
      }

      function _setToken(token) {
        cookieStore.put('token', token);
        updateHttpAuthHeader(token);
        o.token = token;
      }

      o = {
        currentUser: {},
        token: cookieStore.get('token'),
        register: register,
        login: login,
        logout: logout,
        updateHttpAuthHeader: updateHttpAuthHeader,
        setCurrentUser: setCurrentUser
      };

      return o;
  }]);
