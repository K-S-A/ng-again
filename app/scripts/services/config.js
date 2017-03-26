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
    'IMAGES_BASE_URL': 'https://smktesting.herokuapp.com/static/',
    'API_BASE_URL': 'https://smktesting.herokuapp.com/api/',
    'COOKIE_NAMESPACE': 'ngTestApp',
    'MESSAGES': {
      'ON_LOGIN': 'Successfully logged in!',
      'ON_LOGIN_ERROR': 'Wrong user credentials. Check username/password and try again!',
      'ON_REGISTER': 'Successfully registered!',
      'ON_REGISTER_ERROR': 'Something go wrong. Check username/password and try again!',
      'ON_LOGOUT': 'Logged out!',
      'ON_SERVER_ERROR': 'Server error! Please, try again later.'
    }
  });
