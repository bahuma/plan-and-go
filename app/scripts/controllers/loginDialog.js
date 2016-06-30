'use strict';

angular.module('planAndGo')
  .controller('LoginDialogCtrl', ['$mdDialog', 'Auth', '$location', function($mdDialog, Auth, $location) {
    var ctrl = this;

    ctrl.auth = Auth;
    ctrl.user = null;

    ctrl.auth.$onAuthStateChanged(function(firebaseUser) {
      ctrl.user = firebaseUser;
    });

    ctrl.signInWith = function(provider) {
      ctrl.auth.$signInWithPopup(provider).then(function(firebaseUser) {
        ctrl.user = firebaseUser;
        $location.path('/dashboard');
      }).catch(function(error) {
        console.log(error);
        ctrl.error = error;
      });
    };

    ctrl.logout = function () {
      console.log('test');
      ctrl.auth.$signOut();
    };

    ctrl.cancel = function() {
      $mdDialog.hide();
    };
  }]);
