'use strict';

describe('Service: findPost', function () {

  // load the service's module
  beforeEach(module('pinPointApp'));

  // instantiate service
  var findPost;
  beforeEach(inject(function (_findPost_) {
    findPost = _findPost_;
  }));

  it('should do something', function () {
    expect(!!findPost).toBe(true);
  });

});
