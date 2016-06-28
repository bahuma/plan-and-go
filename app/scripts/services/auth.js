'use strict';

angular.module('planAndGo')
  .service('AuthService', ['$firebaseAuth', function($firebaseAuth) {
    var service = {};

    service.firebaseUser = null;
    service.auth = null;

    service.getAuth = function() {
      return $firebaseAuth();
    };

    service.auth = service.getAuth();

    service.auth.$onAuthStateChanged(function(firebaseUser) {
      console.log('Auth state changed: firebaseuser: ', firebaseUser);
      service.firebaseUser = firebaseUser;

      if (firebaseUser == null) {
        service.auth.$signInAnonymously();
      }
    });

    return service;
  }]);
