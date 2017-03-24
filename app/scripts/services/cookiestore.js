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
      put: function (key, value) {
        return $cookieStore.put(Config.COOKIE_NAMESPACE + '.' + key, value);
      },
      get: function (key) {
        return $cookieStore.get(Config.COOKIE_NAMESPACE + '.' + key);
      }
    };
  }]);
