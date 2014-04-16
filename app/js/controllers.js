'use strict';

/* Controllers */

var pcControllers = angular.module('pcControllers', []);

// Controller for Master Page.
pcControllers.controller('MainCtrl', ['$scope',
function ($scope, contextualMenu) {

      $scope.contextualMenu = contextualMenu;

      // Array to hold case records.
      $scope.caseRecords = 
        [   { name: 'Developmental Disabilities', url: 'partials/dd-menu.html'}, 
            { name: 'Mental Health', url: 'partials/mh-menu.html'},
            { name: 'Employment', url: 'partials/employment-menu.html' }
        ];

      // Default to first case record.
      $scope.selectedCaseRecord = $scope.caseRecords[0];
      
      // Function to set case record.
      $scope.setCaseRecord = function(caserecord){
          $scope.selectedCaseRecord = caserecord;
      };

      $scope.mrddMenuItems = [
          {
              menuHeading: 'Individuals',
              menuItems: [
                  'New Individual',
                  'View/Update Individual',
                  'Attach a File',
                  'New Consent For Release',
                  'View/Update Consent For Release'
              ]
          },
          {
              menuHeading: 'Individuals',
              menuItems: [
                  'New Individual',
                  'View/Update Individual',
                  'Attach a File',
                  'New Consent For Release',
                  'View/Update Consent For Release'
                ]
            },
          {}
      ]

  }]);

pcApp.factory('contextualMenu', function () {
    var menu = {};
    var contextualMenuService = {};

    contextualMenuService.get = function () {
        return menu;
    };
    contextualMenuService.set = function (menuItems) {
        menu = menuItems;
    };
    contextualMenuService.clear = function () {
        menu = {};
    };

    return contextualMenuService;
});

// Controller for Attendance.
pcControllers.controller('AttendanceCtrl', ['$scope', 'Attendance',
  function ($scope, Attendance, contextualMenu) {

      // Contextual Menu
      $scope.contextualMenu = {
          'Title': 'Attendance Criteria',
          'Items': ['Service', 'Date']
      };

      contextualMenu = $scope.contextualMenu;

      // Attendance
      $scope.consumerAttendance = Attendance.query();

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
