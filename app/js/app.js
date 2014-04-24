'use strict';

/* App Module */

// Application and it's dependencies.
var pcApp = angular.module('pcApp', [
    'ngRoute',
    'ui.router',
    'ui.bootstrap',
    'pcControllers'
]);

// Route Provider.
pcApp.config(['$routeProvider', 
    function ($routeProvider) {

        $routeProvider.
        when('/attendance/service/:servId/date/:date', {
            templateUrl: 'partials/attendance.html',
            controller: 'AttendanceCtrl'
        }).
        otherwise({
            redirectTo: '/attendance'
        });
    }
]);

// Directive to set up time-picker control.
pcApp.directive('timePicker', function () {
    return {
      restrict: 'A',
      template: '<div class="time-group col-sm-6 col-md-3" ng-if="attendance.duration !== 0">' +
                    '<div class="input-group" ng-if="attendance.start_time">' +
                        '<span class="input-group-addon time-label">Time In:</span>' +
                        '<span class="bootstrap-timepicker">' +
                            '<input type="text" class="timepicker form-control" value="{{attendance.start_time}}">' +
                        '</span>' +
                    '</div>' +
                    '<div class="input-group" ng-if="attendance.start_time && attendance.end_time">' +
                        '<span class="input-group-addon time-label">Time Out:</span>' +
                        '<span class="bootstrap-timepicker">' +
                            '<input type="text" class="timepicker form-control" value="{{attendance.end_time}}">' +
                        '</span>' +
                    '</div>' +
                '</div>',
      scope: {
        attendance: '='
      },
      link: function (scope, elem, attrs) {
      }
  }
});