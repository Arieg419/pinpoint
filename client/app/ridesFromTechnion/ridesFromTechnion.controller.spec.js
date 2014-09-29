'use strict';

describe('Controller: RidesfromtechnionCtrl', function () {

  // load the controller's module
  beforeEach(module('pinPointApp'));

  var RidesfromtechnionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RidesfromtechnionCtrl = $controller('RidesfromtechnionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
