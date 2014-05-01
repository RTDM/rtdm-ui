'use strict';

angular.module('rtdm')
    .controller('DashboardCtrl', function ($scope, $http, $routeParams, stompClient) {
        var dashboardKey = $scope.dashboardKey = $routeParams.dashboardKey;

        $scope.activities = [];
        $http.get('/api/dashboard/' + dashboardKey + '/activities').success(function(data) {
            $scope.activities = data;
        });

        var registration = {
            topic: '/topic/dashboard.' + dashboardKey,
            callback: function (data) {
                if (data.type === 'activity') {
                    $scope.activities.push(data.activity);
                } else {
                    console.log('unhandled event type: ', data.type, data);
                }
            }
        };

        stompClient.subscribe(registration);

        $scope.$on('$destroy', function () {
            stompClient.unsubscribe(registration);
        });
    });
