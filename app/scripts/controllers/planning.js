'use strict';

angular.module('planAndGo')
  .controller('PlanningCtrl', ['$routeParams', '$firebaseObject', 'Auth', function($routeParams, $firebaseObject, Auth) {
    var ctrl = this;

    var ref = firebase.database().ref('plannings/' + $routeParams.planningId);
    ctrl.planning = $firebaseObject(ref);

    ctrl.auth = Auth;
    ctrl.user = null;

    ctrl.auth.$onAuthStateChanged(function(firebaseUser) {
      ctrl.user = firebaseUser;
    });

    ctrl.users = {};


    ctrl.getUserData = function (uid) {
      if (!ctrl.users.hasOwnProperty(uid)) {
        var ref = firebase.database().ref('users/' + uid);
        ctrl.users[uid] = $firebaseObject(ref);
      }

      return ctrl.users[uid];
    };

    ctrl.userBrings = function(key) {
      ctrl.planning.data.options[key].user = ctrl.user.uid;
      ctrl.planning.$save();
    };

    ctrl.userBringsNot = function(key) {
      ctrl.planning.data.options[key].user = "";
      ctrl.planning.$save();
    };

    ctrl.addOption = function(title) {
      console.log(title);
      var newOption = {
        title: title,
        user: ""
      };

      ctrl.planning.data.options.push(newOption);
      ctrl.planning.$save();
    };
  }]);
