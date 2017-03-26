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
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngFlash',
    'ui.router',
    'ui.bootstrap',
    'djangoRESTResources',
    'yaru22.angular-timeago'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as vm'
      })
      .state('register', {
        url: '/registration',
        templateUrl: 'views/register.html',
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
          products: ['$q', 'Product', function ($q, Product) {
            var deferred = $q.defer();

            if (Product.all) {
              deferred.resolve(Product.all);
              return deferred.promise;
            }

            Product.query(function (data) {
              Product.all = data;
              deferred.resolve(data);
            });
            return deferred.promise;
          }],
          reviews: ['$stateParams', 'Review', function ($stateParams, Review) {
            Review.all = Review.query({productId: $stateParams.id});
          }]
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl as vm'
      });

      $urlRouterProvider.otherwise('/');
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
          $state.go('root');
        }

        cookieStore.put('token', newVal);
      });

      $rootScope.$watch(function () {
        return Auth.currentUser.username;
      }, function (newVal) {
        cookieStore.put('username', newVal);
      });
  }]);
