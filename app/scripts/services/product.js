'use strict';

/**
 * @ngdoc service
 * @name ngTestApp.Product
 * @description
 * # Product
 * Factory in the ngTestApp.
 */
angular.module('ngTestApp')
  .factory('Product', ['djResource', 'Config',
    function (djResource, Config) {
      return djResource(
        Config.API_BASE_URL + 'products/:id/',
        { id: '@id' },
        {
          query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(data) {
              return angular.fromJson(data).map(function (product) {
                product.img = Config.IMAGES_BASE_URL + product.img;
                return product;
              });
            }
          }
        }
      );
    }
  ]);
