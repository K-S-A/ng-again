'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('ngTestApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach login Function', function () {
    expect(LoginCtrl.login).toEqual(jasmine.any(Function));
  });

  it('should attach logout Function', function () {
    expect(LoginCtrl.logout).toEqual(jasmine.any(Function));
  });
});
