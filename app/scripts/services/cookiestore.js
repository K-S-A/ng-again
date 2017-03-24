'use strict';

/**
 * @ngdoc service
 * @name ngTestApp.cookieStore
 * @description
 * # cookieStore
 * Factory in the ngTestApp.
 */
angular.module('ngTestApp')
  .factory('cookieStore', ['$cookieStore', 'Config', function ($cookieStore, Config) {
    return {
      tokenKey: Config.COOKIE_NAMESPACE + '.token',
      usernameKey: Config.COOKIE_NAMESPACE + '.username',
      put: function (key, value) {
        return $cookieStore.put(this[key + 'Key'], value);
      },
      get: function (key) {
        return $cookieStore.get(this[key + 'Key']);
      }
    };
  }]);
