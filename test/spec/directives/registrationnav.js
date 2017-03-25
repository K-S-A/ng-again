'use strict';

describe('Directive: registrationNav', function () {

  // load the directive's module
  beforeEach(module('ngTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<registration-nav></registration-nav>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the registrationNav directive');
  // }));
});
