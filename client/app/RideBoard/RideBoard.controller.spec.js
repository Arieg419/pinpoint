'use strict';

describe('Controller: RideboardCtrl', function () {

  // load the controller's module
  beforeEach(module('pinPointApp'));

  var RideboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RideboardCtrl = $controller('RideboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
