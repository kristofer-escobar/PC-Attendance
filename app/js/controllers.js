'use strict';

/* Controllers */

var pcControllers = angular.module('pcControllers', []);

// Main Controller.
pcControllers.controller('MainCtrl', ['$scope',
function ($scope) {

      // List of case records.
      $scope.caseRecords = 
        [   { name: 'Developmental Disabilities', url: 'partials/dd-menu.html'}, 
            { name: 'Mental Health', url: 'partials/mh-menu.html'},
            { name: 'Employment', url: 'partials/employment-menu.html' }
        ];

      // Set default case record.
      $scope.selectedCaseRecord = $scope.caseRecords[0];
      
      // Function to set case record.
      $scope.setCaseRecord = function(caserecord){
          $scope.selectedCaseRecord = caserecord;
      };

      // MRDD Menu Items.
      $scope.mrddMenuItems = [
          {
            title: 'Attendance',
            content: [
              {title: 'Attendance', url: 'attendance'},
              {title: 'Attendance Only Summary', url: 'attendanceOnlySummary'}
            ]
          }
      ];

  }]);

// Attendance Controller
pcControllers.controller('AttendanceCtrl', ['$scope', '$http', '$stateParams', '$location', '$state', '$urlRouter',
  function ($scope, $http, $stateParams, $location, $state, $urlRouter) {
    console.log('Entering Controller..' + $state.current.name);

      // Default service to service id 0.
      if(!$stateParams.servId){
        $stateParams.servId = 0; 
        console.log('Serv Id set to ' + $stateParams.servId);
      }

      // Default attendance to today's date.
      if(!$stateParams.date){
        $stateParams.date = new Date().today();
        console.log('Date set to ' + $stateParams.date);
      }

      // Request to get services.
      $http.get('http://localhost:6543/attendance').
      success(function(data) {
        // Get services.
        $scope.services = data;
        $scope.selectedService = data.filter(function( service ) {
          return service.id == $stateParams.servId;
        })[0];
      }). 
      error(function(){
        // Request to get services failed.
        $scope.addAlert({ type: 'danger', msg: 'Oops!, Service data failed to load.' });
      });

      $scope.getAttendance = function(){

        // Request to get attendnace for a service on a given day.
        $http.get('http://localhost:6543/attendance/service/' + $stateParams.servId + '/date/' + $stateParams.date).
        success(function(data) {
          // Get Attendance Records
          $scope.clientAttendance = data;
        }). 
        error(function(){
          // Request to get attendance failed.
          $scope.addAlert({ type: 'danger', msg: 'Oops!, Attendance data failed to load.' });
        });
      };

      $scope.getAttendance();

      $scope.serviceChanged = function(service){
        $scope.selectedService = service;
        console.log($scope.selectedService);
        $location.path('/attendance/service/' + service.id + '/date/' + $stateParams.date);
        $scope.location = $location.path();
      };

      $scope.selectedDate =  $stateParams.date;

      $scope.dateChanged = function(date){
        var dateParam = date.getFullYear() + '-'+ (((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1)+ "-" + ((date.getDate() < 10)?"0":"") + date.getDate();
        $location.path('/attendance/service/' + $stateParams.servId + '/date/' + dateParam);
        $scope.location = $location.path();
      };

      // Array to alerts.
      $scope.alerts = [];

      $scope.addAlert = function(alert) {

        /*
         * Summary:
         * Adds alert to alerts collection.
         */  
               
        $scope.alerts.push({type: alert.type, msg: alert.msg});
      };

      $scope.closeAlert = function(index) {

        /*
         * Summary:
         * Removes alert from alerts collection.
         */

        $scope.alerts.splice(index, 1);
      };

      // Page heading.
      $scope.heading = "Individual Attendance";

      // Attendance Contextual Menu
      $scope.contextualMenu = {
        title: 'Attendance Criteria',
        content: [
        'Service',
        'Date'
        ]
          }

      // Used to store function to initialize timepickers.
      $scope.timepicker = {};

      $scope.ShowTimeIn = function(attendance){

        /*
         * Summary:
         * Show the "Time In" button when the last time entered was an end time,
         * or if there isn't any attendance. 
         */
        
        var showTimeIn = false;

        if(attendance.length){

          // Get last entered attendance record.
          var lastAttendanceRecord = attendance[attendance.length - 1];

          if(lastAttendanceRecord.start_time && lastAttendanceRecord.end_time){
            showTimeIn = true;
          }

        }else{

          // No Attendance found.
          showTimeIn = true; 
        }

        return showTimeIn;
      }

      $scope.ShowTimeOut = function(attendance){

        /*
         * Summary:
         * Show the "Time Out" button when there is a start time and no end time. 
         */

        var showTimeOut = false;

        if(attendance.length){

          // Get last entered attendance record.
          var lastAttendanceRecord = attendance[attendance.length - 1];

          if(lastAttendanceRecord.start_time && !lastAttendanceRecord.end_time){
            showTimeOut = true;
          }
        }

        return showTimeOut;
      }

      $scope.TimeIn = function(attendance){

        /*
         * Summary:
         * Add a time row. If there is no attendance,
         * create a duration row.
         */

        // Check if there is no attendance.
        if(attendance.length == 0){

          // No attendance found, create a duration row.
          var durationRow = {
            "start_time": null, 
            "deduction_threshold": null, 
            "status": "Open", 
            "duration_text": null, 
            "deduction_time": null, 
            "duration": 0, 
            "end_time": null, 
            "date": new Date().today(), 
            "id": null, 
            "use_deduction": null, 
            "stf_id": null
          };

          attendance.push(durationRow);
        }

        // Create time row.
        var timeRow = {
          "start_time": new Date().timeNow(), 
          "deduction_threshold": null, 
          "status": "Open", 
          "duration_text": null, 
          "deduction_time": null, 
          "duration": null, 
          "end_time": null, 
          "date": new Date().today(), 
          "id": null, 
          "use_deduction": null, 
          "stf_id": null
        };

        attendance.push(timeRow);
      }

      $scope.TimeOut = function(attendance){

        /*
         * Summary:
         * Add a time out and update status to "Closed".
         */

        // Check if there is attendance.
        if(attendance.length){
          // Attendance Found, validate times.

          // Change status.
          attendance[attendance.length - 1].status = 'Closed';

          // Add end time.
          attendance[attendance.length - 1].end_time = new Date().timeNow();

        }
      }

  }]);
