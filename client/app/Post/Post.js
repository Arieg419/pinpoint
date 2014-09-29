'use strict';

angular.module('pinPointApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/Post', {
        templateUrl: 'app/Post/Post.html',
        controller: 'PostCtrl'
      });
  });
