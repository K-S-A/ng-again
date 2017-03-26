'use strict';

/**
 * @ngdoc service
 * @name ngTestApp.Review
 * @description
 * # Review
 * Factory in the ngTestApp.
 */
angular.module('ngTestApp')
  .factory('Review', ['Config', 'djResource', function (Config, djResource) {
    return djResource(Config.API_BASE_URL + 'reviews/:productId', { productId: '@productId' });
  }]);
