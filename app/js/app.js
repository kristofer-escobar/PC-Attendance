'use strict';

/* App Module */

var pcApp = angular.module('pcApp', [
    'ngRoute',
    'pcControllers',
    'pcServices',
    'ngLoadScript'
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

/*global angular */
(function (ng) {
    'use strict';
    var app = ng.module('ngLoadScript', []);

    app.directive('script', function () {
        return {
            restrict: 'E',
            scope: false,
            link: function (scope, elem, attr) {
                if (attr.type === 'text/javascript-lazy') {
                    var s = document.createElement("script");
                    s.type = "text/javascript";
                    var src = elem.attr('src');
                    if (src !== undefined) {
                        s.src = src;
                    }
                    else {
                        var code = elem.text();
                        s.text = code;
                    }
                    document.head.appendChild(s);
                    elem.remove();
                }
            }
        };
    });
}(angular));