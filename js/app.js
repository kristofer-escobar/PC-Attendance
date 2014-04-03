'use strict';

/* App Module */

var pcApp = angular.module('pcApp', [
    'ngRoute',
    'pcControllers'
]);

pcApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/attendance', {
            templateUrl: 'partials/attendance.html',
            controller: 'AttendanceCtrl'
        }).
        otherwise({
            redirectTo: '/attendance'
        });
  }]);