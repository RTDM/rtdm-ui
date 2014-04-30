'use strict';

angular.module('rtdm.ui')
    .controller('DashboardCtrl', function ($scope, $routeParams, Dashboard) {

        var dashboardKey = $routeParams.id;

        // Load all dashboard cards
        $scope.cards = Dashboard.getCards(dashboardKey, function (cards) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].rating = 0;
            }
        });

    });
