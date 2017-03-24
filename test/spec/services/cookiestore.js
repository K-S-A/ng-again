'use strict';

describe('Service: cookieStore', function () {

  // load the service's module
  beforeEach(module('ngTestApp'));

  // instantiate service
  var cookieStore;
  beforeEach(inject(function (_cookieStore_) {
    cookieStore = _cookieStore_;
  }));

  it('should do something', function () {
    expect(!!cookieStore).toBe(true);
  });

});
