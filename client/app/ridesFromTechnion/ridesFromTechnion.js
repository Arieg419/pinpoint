'use strict';

angular.module('pinPointApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ridesFromTechnion', {
        templateUrl: 'app/ridesFromTechnion/ridesFromTechnion.html',
        controller: 'RidesfromtechnionCtrl'
      });
  });
