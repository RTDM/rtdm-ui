'use strict';

angular.module('rtdm', ['rtdm.ui', 'rtdm.services']);

angular.module('rtdm.services', ['ngResource']);

angular.module('rtdm.ui', [
        'ngCookies',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })
            .when('/dashboard/:id', {
                templateUrl: 'views/Dashboard.html'
            })
            .when('/dashboard/:dashboardKey', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

