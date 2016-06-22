'use strict';

angular.module('planAndGo')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/home'
      });
  }]);
