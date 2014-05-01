'use strict';

angular.module('rtdm.ui')
    .controller('DashboardCtrl', function ($scope, $routeParams, Dashboard, StompClient) {

        var dashboardKey = $scope.dashboardKey = $routeParams.dashboardKey;

        // Register client in order to receive real times changes as events (rabbitmq webstomp)
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

        StompClient.subscribe(registration);

        $scope.$on('$destroy', function () {
            StompClient.unsubscribe(registration);
        });

        // Displayed categories
        $scope.categories = [ 'TODO', 'DOING', 'PUSHED', 'BUILT', 'DEPLOYED' ];

        // Load dashboard activities
        $scope.activities = Dashboard.getActivities(dashboardKey);

        // Load all dashboard cards
        $scope.cards = Dashboard.getCards(dashboardKey);

    });
