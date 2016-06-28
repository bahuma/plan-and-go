'use strict';

angular.module('planAndGo', [
  'ngRoute',
  'ngMaterial',
  'firebase'
]);

var config = {
  apiKey: "AIzaSyDiae3oaQj3r5sPtKzPHmsdopIJBtdZXcM",
  authDomain: "plan-and-go-1a340.firebaseapp.com",
  databaseURL: "https://plan-and-go-1a340.firebaseio.com",
  storageBucket: "plan-and-go-1a340.appspot.com"
};
firebase.initializeApp(config);
