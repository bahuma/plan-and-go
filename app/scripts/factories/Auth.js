'use strict';

angular.module('planAndGo')
  .factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
    return $firebaseAuth();
  }]);
