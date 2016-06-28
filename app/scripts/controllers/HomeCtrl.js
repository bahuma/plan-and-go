'use strict';

angular.module('planAndGo')
  .controller('HomeCtrl', ['PlanTypesService', function(PlanTypesService) {
    var ctrl = this;

    ctrl.appName = "Plan and Go";
    ctrl.slogan = "Plane alles Mögliche schnell und unkompliziert";

    ctrl.planTypes = PlanTypesService.getPlanTypes();
  }]);
