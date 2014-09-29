'use strict';

describe('Service: ridePost', function () {

  // load the service's module
  beforeEach(module('pinPointApp'));

  // instantiate service
  var ridePost;
  beforeEach(inject(function (_ridePost_) {
    ridePost = _ridePost_;
  }));

  it('should do something', function () {
    expect(!!ridePost).toBe(true);
  });

});
