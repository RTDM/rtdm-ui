'use strict';

angular.module('rtdm.ui')
    .controller('DashboardCtrl', function ($scope, $routeParams, Common, Dashboard, StompClient) {

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

        angular.extend($scope, {
            categories: [
                {
                    name: 'TODO',
                    type: 'info'
                },
                {
                    name: 'DOING',
                    type: 'info'
                },
                {
                    name: 'PUSHED',
                    type: 'info',
                    logo: 'http://aglick.com/snIcons/GithubLogo.png'
                },
                {
                    name: 'BUILT',
                    type: 'warning',
                    logo: 'http://www.dailyhostnews.com/wp-content/uploads/2013/03/CloudBees_logo_600x450.jpeg'
                },
                {
                    name: 'DEPLOYED',
                    type: 'success',
                    logo: 'https://pbs.twimg.com/profile_images/2182907658/heroku-logo-for-facebook.png'
                }
            ],
            activities: Dashboard.getActivities(dashboardKey),
            cards: Dashboard.getCards(dashboardKey),
            dateTimeFormat: Common.defaultUIDateTimestampFormat,
            openCardDetails: function (card) {
                $scope.selectedCard = card;
            }
        });
    });
