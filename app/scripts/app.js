'use strict';

angular.module('rtdm', ['rtdm.ui', 'rtdm.services']);

angular.module('rtdm.services', ['ngResource'])
    .run(function (StompClient) {
        StompClient.connect();
    });

angular.module('rtdm.ui', [
        'ngCookies',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/Main.html'
            })
            .when('/dashboard/:dashboardKey', {
                templateUrl: 'views/Dashboard.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

