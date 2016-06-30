'use strict';

angular.module('planAndGo')
  .service('AuthService', ['$firebaseAuth', '$mdDialog', '$mdMedia', 'Auth', function($firebaseAuth, $mdDialog, $mdMedia, Auth) {
    var service = {};

    service.showLoginDialog = function(ev) {
      // var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      var useFullScreen = $mdMedia('xs');

      return $mdDialog.show({
        controller: 'LoginDialogCtrl',
        controllerAs: 'loginCtrl',
        templateUrl: 'views/dialogs/login.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      });
    };

    return service;
  }]);
