'use strict';

angular.module('planAndGo')
  .run(['Auth', function(Auth){
    Auth.$onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser === null) {
        Auth.$signInAnonymously();
      }
    });
  }]);
