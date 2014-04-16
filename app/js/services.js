var pcServices = angular.module('pcServices', ['ngResource']);

pcServices.factory('Attendance', ['$resource',
  function ($resource) {
      return $resource('http://localhost:6543/attendance', {}, {
          query: { method: 'GET', isArray: true }
      });
  }]);