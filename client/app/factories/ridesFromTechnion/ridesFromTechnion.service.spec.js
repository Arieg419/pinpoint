'use strict';

describe('Service: ridesFromTechnion', function () {

  // load the service's module
  beforeEach(module('pinPointApp'));

  // instantiate service
  var ridesFromTechnion;
  beforeEach(inject(function (_ridesFromTechnion_) {
    ridesFromTechnion = _ridesFromTechnion_;
  }));

  it('should do something', function () {
    expect(!!ridesFromTechnion).toBe(true);
  });

});
