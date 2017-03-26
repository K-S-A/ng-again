'use strict';

/**
 * @ngdoc service
 * @name ngTestApp.Review
 * @description
 * # Review
 * Factory in the ngTestApp.
 */
angular.module('ngTestApp')
  .factory('Review', ['Config', 'djResource', 'Auth', function (Config, djResource, Auth) {
    var Review = djResource(
      Config.API_BASE_URL + 'reviews/:productId',
      { productId: '@productId' },
      {
        save: {
          method: 'POST',
          headers: {
            'Authorization': 'Token ' + Auth.token
          }
        }
      }
    );

    Review.refresh = function (params, callback) {
      return function () {
        Review.query(params, function (data) {
          var ids = Review.all.map(function (review) {
            return review.id;
          });

          data.forEach(function (product) {
            if (ids.indexOf(product.id) < 0) {
              Review.all.push(product);
            }
          });

          callback();
        });
      };
    };

    Review.create = function (attrs, params, successCallback, errorCallback) {
      new Review(attrs).$save(params, Review.refresh(params, successCallback), errorCallback);
    };

    return Review;
  }]);
