'use strict';

/* Controllers */

var pcControllers = angular.module('pcControllers', []);

// Controller for Master Page.
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
              title: 'Individuals',
              content: [
                  'New Individual',
                  'View/Update Individual',
                  'Attach a File',
                  'New Consent For Release',
                  'View/Update Consent For Release'
              ]
          },
          {
              title: 'Intake',
              content: [
                  'Referral',
                  'Servcies/Enrollment',
                  'Screening'
                ]
            }
      ]

  }]);

// Attendance Controller
pcControllers.controller('AttendanceCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {

      if($routeParams.servId == ''){
        $routeParams.servId = 0;      
      }

      if($routeParams.date == ''){
        $routeParams.date = new Date().today();
      }

      $http.get('http://localhost:6543/attendance/service/' + $routeParams.servId + '/date/' + $routeParams.date).
      success(function(data) {
        // Attendance Records
        $scope.clientAttendance = data;
      }). 
      error(function(){
        alert("Failed");
      });

      // Attendance Contextual Menu
      $scope.contextualMenu = {
          'Title': 'Attendance Criteria',
          'Items': ['Service', 'Date']
      };

      $scope.ShowTimeIn = function(attendance){

        /*
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
         * Show the "Time Out" button when there is a start time and no end time. 
         */

        var showTimeOut = false;

        // Get last entered attendance record.
        var lastAttendanceRecord = attendance[attendance.length - 1];

        if(attendance.length){

          if(lastAttendanceRecord.start_time && !lastAttendanceRecord.end_time){
            showTimeOut = true;
          }
        }

        return showTimeOut;
      }

      $scope.TimeIn = function(client){

        // Check if there is attendance.
        var attendance = client.attendance;

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

      $scope.TimeOut = function(client){

        // Check if there is attendance.
        var attendance = client.attendance;

        if(attendance.length){
          // Attendance Found, validate times.

          // Change status.
          attendance[attendance.length - 1].status = 'Closed';

          // Add end time.
          attendance[attendance.length - 1].end_time = new Date().timeNow();
        }
      }

    //      [
    //{
    //    'id': 0,
    //    'name': 'Mike Test',
    //    'times': [{ 'in': '12:00 PM', 'out': '1:00 PM' }, {'in':'2:00 PM'}]
    //},
    //{
    //    'id': 1,
    //    'name': 'Bob Test',
    //    'times': [{ 'in': '11:00 PM', 'out': '2:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }]
    //},
    //{
    //    'id': 2,
    //    'name': 'Peter Test',
    //    'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }]
    //},
    //{
    //    'id': 3,
    //    'name': 'Greg Test',
    //    'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }]
    //},
    //{
    //    'id': 4,
    //    'name': 'John Test',
    //    'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }]
    //},
    //{
    //    'id': 5,
    //    'name': 'Bill Test',
    //    'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }]
    //},
    //{
    //    'id': 6,
    //    'name': 'Neal Test',
    //    'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }, { 'in': '10:00 PM', 'out': '11:00 PM' }, { 'in': '12:00 PM', 'out': '1:00 AM' }]
    //}
    //  ];

  }]);
