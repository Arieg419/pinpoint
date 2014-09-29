'use strict';

angular.module('pinPointApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/Find', {
        templateUrl: 'app/Find/Find.html',
        controller: 'FindCtrl'
      });
  });
