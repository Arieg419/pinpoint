'use strict';

angular.module('pinPointApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/RideBoard', {
        templateUrl: 'app/RideBoard/RideBoard.html',
        controller: 'RideboardCtrl'
      });
  });
