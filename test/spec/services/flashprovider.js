'use strict';

describe('Service: FlashProvider', function () {

  // load the service's module
  beforeEach(module('ngTestApp'));

  // instantiate service
  var FlashProvider;
  beforeEach(inject(function (_FlashProvider_) {
    FlashProvider = _FlashProvider_;
  }));

  it('should do something', function () {
    expect(!!FlashProvider).toBe(true);
  });

});
