'use strict';

angular.module('planAndGo')
  .controller('CreateWerBringtWasCtrl', ['Auth', '$firebaseArray', '$location', '$mdToast', function(Auth, $firebaseArray, $location, $mdToast) {
    var ctrl = this;

    var planingsref = firebase.database().ref().child('plannings');
    var query = planingsref.limitToLast(1);

    var plannings = $firebaseArray(query);

    ctrl.auth = Auth;
    ctrl.user = null;

    ctrl.auth.$onAuthStateChanged(function(firebaseUser) {
      ctrl.user = firebaseUser;
      ctrl.plan.by = ctrl.user.uid;
    });

    ctrl.plan = {
      type: 'wer-bringt-was',
      title: '',
      by: '',
      data: {
        options: [{value:""}],
        usersCanAddOptions: false
      }
    };

    ctrl.addOption = function() {
      ctrl.plan.data.options.push({value: ""});
    };

    ctrl.save = function() {
      var realOptions = [];

      angular.forEach(ctrl.plan.data.options, function(option) {
        realOptions.push(option.value);
      });

      ctrl.plan.data.options = realOptions;

      plannings.$add(ctrl.plan);

      $mdToast.show($mdToast.simple().textContent('Wer bringt was erstellt').position('bottom left').hideDelay(3000));

      $location.path('/dashboard');
    };

    console.log(ctrl.plan);
  }]);
