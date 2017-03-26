'use strict';

/**
 * @ngdoc overview
 * @name ngTestApp
 * @description
 * # ngTestApp
 *
 * Main module of the application.
 */
angular
  .module('ngTestApp', [
    'ngAria',
    'ngCookies',
    'ngFlash',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'djangoRESTResources',
    'yaru22.angular-timeago'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('register', {
        url: '/registration',
        templateUrl: 'views/auth/register.html',
        controller: 'RegisterCtrl as vm'
      })
      .state('products', {
        url: '/products',
        templateUrl: 'views/products/index.html',
        controller: 'ProductsCtrl as vm',
        resolve: {
          products: ['Product', function (Product) {
            Product.all = Product.query();
          }]
        }
      })
      .state('product', {
        url: '/products/{id:int}',
        views: {
          '': {
            templateUrl: 'views/products/show.html',
            controller: 'ProductCtrl as vm',
          },
          'reviews': {
            templateUrl: 'views/reviews/index.html',
            controller: 'ReviewsCtrl as vm',
          },
          'add-review': {
            templateUrl: 'views/reviews/form.html',
            controller: 'ReviewsCtrl as vm',
          }
        },
        resolve: {
          products: ['$q', '$stateParams', 'Product', function ($q, $stateParams, Product) {
            var deferred = $q.defer();

            Product.query(function (data) {
              Product.all = data;
              if (Product.get($stateParams.id)) {
                deferred.resolve(data);
              } else {
                deferred.reject();
              }
            }, function (err) {
              deferred.reject(err);
            });

            return deferred.promise;
          }],
          reviews: ['$stateParams', 'Review', function ($stateParams, Review) {
            Review.all = Review.query({productId: $stateParams.id});
          }]
        }
      });

      $urlRouterProvider.otherwise('/products');
  }])
  .run(['$rootScope', '$state', 'Config', 'cookieStore', 'Auth',
    function ($rootScope, $state, Config, cookieStore, Auth) {
      // Fix for broken carousel on state change
      $rootScope.$on('$viewContentLoaded', function() {
        angular.element(document).find('#productsCarousel').carousel();
      });

      $rootScope.$watch(function () {
        return Auth.token;
      }, function (newVal) {
        if (newVal && $state.current.name === 'register') {
          $state.go('products');
        }

        cookieStore.put('token', newVal);
      });

      $rootScope.$watch(function () {
        return Auth.currentUser.username;
      }, function (newVal) {
        cookieStore.put('username', newVal);
      });
  }]);
