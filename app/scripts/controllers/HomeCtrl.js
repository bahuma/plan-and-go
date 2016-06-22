'use strict';

angular.module('planAndGo')
  .controller('HomeCtrl', [function() {
    var ctrl = this;

    ctrl.appName = "Plan and Go";
    ctrl.slogan = "Plane alles Mögliche schnell und unkompliziert";

    ctrl.planTypes = [
      {
        slug: 'termine-finden',
        title: 'Termine finden',
        description: 'Für mehrere Personen den passenden Termin finden. Du kannst Terminvorschläge einstellen und andere können Bescheid geben, an welchen Tagen sie Zeit haben.',
        image: 'termine-finden'
      },
      {
        slug: 'wer-bringt-was',
        title: 'Wer bringt was',
        description: 'Hast du schon mal eine Grillparty mit deinen Freunden geplant und ihr hattet 4 Kartoffelsalate auf dem Tisch stehen? Mit einem "Wer bring was"-Plan wäre das nicht passiert.',
        image: 'wer-bringt-was'
      },
      {
        slug: 'umfragen',
        title: 'Umfragen',
        description: 'Welchen Film wollt ihr sehen? Welche Karte soll beim Paintball gespielt werden? In welches Restaurant geht es zum Essen?',
        image: 'umfragen'
      }
    ];
  }]);
