'use strict';

angular.module('planAndGo')
  .controller('HomeCtrl', ['PlanTypesService', 'AuthService', 'Auth', '$location', function(PlanTypesService, AuthService, Auth, $location) {
    var ctrl = this;

    ctrl.auth = Auth;
    ctrl.user = null;

    ctrl.auth.$onAuthStateChanged(function(firebaseUser) {
      ctrl.user = firebaseUser;
    });

    ctrl.appName = "Plan and Go";
    ctrl.slogan = "Plane alles Mögliche schnell und unkompliziert";

    ctrl.planTypes = PlanTypesService.getPlanTypes();

    ctrl.createPlan = function(slug) {
      if (ctrl.user.isAnonymous) {
        AuthService.showLoginDialog()
      } else {
        $location.path('/create/' + slug);
      }
    };

    ctrl.showLoginDialog = function(ev) {
      AuthService.showLoginDialog(ev);
    };
  }]);
