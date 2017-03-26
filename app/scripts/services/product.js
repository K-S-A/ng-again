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
      var Product = djResource(
        Config.API_BASE_URL + 'products/:id/',
        { id: '@id' },
        {
          query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(data) {
              return angular.fromJson(data).map(function (product, index) {
                if (!/^https?:.+$/.test(product.img)) {
                  product.img = Config.IMAGES_BASE_URL + product.img;
                }
                product._index = index;
                return product;
              });
            }
          }
        }
      );

      Product.get = function (id) {
        return Product.all.find(function (product) {
          return product.id === id;
        });
      };

      Product.prevProduct = function (product) {
        return Product.all[product._index - 1] || Product.all[Product.all.length - 1];
      };

      Product.nextProduct = function (product) {
        return Product.all[product._index + 1] || Product.all[0];
      };

      return Product;
    }
  ]);
