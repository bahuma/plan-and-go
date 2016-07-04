'use strict';

angular.module('planAndGo')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        controllerAs: 'homeCtrl',
        templateUrl: 'views/home.html'
      })

      .when('/create/wer-bringt-was', {
        controller: 'CreateWerBringtWasCtrl',
        controllerAs: 'createCtrl',
        templateUrl: 'views/create-wer-bringt-was.html'
      })

      .when('/p/:planningId', {
        controller: 'PlanningCtrl',
        controllerAs: 'planningCtrl',
        templateUrl: 'views/planning.html'
      })

      .otherwise({
        redirectTo: '/'
      });
  }]);
