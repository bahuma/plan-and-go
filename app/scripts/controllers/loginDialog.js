'use strict';

angular.module('planAndGo')
  .controller('LoginDialogCtrl', ['$mdDialog', 'Auth', '$location', function($mdDialog, Auth, $location) {
    var ctrl = this;

    ctrl.auth = Auth;
    ctrl.user = null;

    ctrl.auth.$onAuthStateChanged(function(firebaseUser) {
      ctrl.user = firebaseUser;

      var userRef = firebase.database().ref('users/' + firebaseUser.uid);

      userRef.on('value', function(snapshot){
        if (snapshot.val() === null) {
          console.log('data', snapshot.val());
          var userProfile = {
            name: ctrl.user.displayName,
            email: ctrl.user.email
          };

          userRef.set(userProfile);
        }
      });
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
