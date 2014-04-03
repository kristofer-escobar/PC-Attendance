'use strict';

/* Controllers */

var pcControllers = angular.module('pcControllers', []);

pcControllers.controller('AttendanceCtrl', ['$scope',
  function($scope) {
      $scope.consumers = [
    {
        'id': 0,
        'name': 'Mike Test',
        'times': [{ 'in': '12:00 PM', 'out': '1:00 PM' }, {'in':'2:00 PM'}]
    },
    {
        'id': 1,
        'name': 'Bob Test',
        'times': [{ 'in': '11:00 PM', 'out': '2:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }]
    },
    {
        'id': 2,
        'name': 'Peter Test',
        'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }]
    },
    {
        'id': 3,
        'name': 'Greg Test',
        'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }]
    },
    {
        'id': 4,
        'name': 'John Test',
        'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }]
    },
    {
        'id': 5,
        'name': 'Bill Test',
        'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }]
    },
    {
        'id': 6,
        'name': 'Neal Test',
        'times': [{ 'in': '9:00 PM', 'out': '4:00 PM' }, { 'in': '5:00 PM', 'out': '7:00 PM' }, { 'in': '8:00 PM', 'out': '9:00 PM' }, { 'in': '10:00 PM', 'out': '11:00 PM' }, { 'in': '12:00 PM', 'out': '1:00 AM' }]
    }
      ];

  }]);



