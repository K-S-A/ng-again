'use strict';

/**
 * @ngdoc service
 * @name ngTestApp.Auth
 * @description
 * # Auth
 * Factory in the ngTestApp.
 */
angular.module('ngTestApp')
  .factory('Auth', ['$http', 'cookieStore', 'Config', function ($http, cookieStore, Config) {
    var o;

    function register(username, password) {
      _authorize('register/', { username: username, password: password });
    }

    function login(username, password) {
      _authorize('login/', { username: username, password: password });
    }

    function logout() {
      _setToken();
      setCurrentUser();
    }

    function isAuthorized() {
      return !!o.token;
    }

    function updateHttpAuthHeader(token) {
      token = token || _fetchToken();

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

    function _authorize(path, params) {
      $http.post(Config.API_BASE_URL + path, params).then(function(response) {
        if (response.data.success) {
          console.log(response);
          _setToken(response.data.token);
          setCurrentUser(params.username);
          return;
        }

        console.log(response.data.message);
        logout();
      });
    }

    function _setToken(token) {
      cookieStore.put('token', token);
      updateHttpAuthHeader(token);
      o.token = token;
    }

    function _fetchToken() {
      return cookieStore.get('token');
    }

    o = {
      currentUser: {},
      token: _fetchToken(),
      register: register,
      login: login,
      logout: logout,
      isAuthorized: isAuthorized,
      updateHttpAuthHeader: updateHttpAuthHeader,
      setCurrentUser: setCurrentUser
    };

    return o;
  }]);
