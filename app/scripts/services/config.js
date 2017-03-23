'use strict';

/**
 * @ngdoc service
 * @name ngTestApp.Config
 * @description
 * # Config
 * Constant in the ngTestApp.
 */
angular.module('ngTestApp')
  .constant('Config', {
    'API_BASE_URL': 'https://smktesting.herokuapp.com/api/',
    'COOKIE_NAMESPACE': 'ngTestApp'
  });
