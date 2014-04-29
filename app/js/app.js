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

// Directive to set up time-picker controls.
pcApp.directive('timePicker', function ($timeout) {
    return {
      restrict: 'A',
      template: '<div class="time-group col-sm-6 col-md-3" ng-if="attendance.duration !== 0">' +
                    '<div class="input-group" ng-if="attendance.start_time">' +
                        '<span class="input-group-addon time-label">Time In:</span>' +
                        '<span class="bootstrap-timepicker">' +
                            '<input type="text" class="timepicker form-control" ng-model="attendance.start_time">' +
                        '</span>' +
                    '</div>' +
                    '<div class="input-group" ng-if="attendance.start_time && attendance.end_time">' +
                        '<span class="input-group-addon time-label">Time Out:</span>' +
                        '<span class="bootstrap-timepicker">' +
                            '<input type="text" class="timepicker form-control" ng-model="attendance.end_time">' +
                        '</span>' +
                    '</div>' +
                '</div>',
      scope: {
        attendance: '=',
        control: '='
      },
      link: function (scope, elem, attrs) {

        // Get reference to outside control.
        scope.internalControl = scope.control;

        // Fuction to initalize timepicker controls.
        scope.internalControl.initTimePicker = function(){
            $timeout(function(){
                $(".timepicker.form-control").each(function() {
                    $(this).timepicker({
                        minuteStep: 1,
                        showInputs: false,
                        disableFocus: true,
                        disableMouseWheel: true
                    });
                });
            }, 0);
        };

        // Initialize timepickers.
        scope.internalControl.initTimePicker();

      }
  }
});
