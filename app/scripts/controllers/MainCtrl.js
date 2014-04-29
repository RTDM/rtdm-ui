'use strict';

angular.module('rtdm.ui')
    .controller('MainCtrl', function ($scope, $location) {

        $scope.goToDashboard = function (dashboardKey) {
            $location.path('/dashboard/' + dashboardKey);
        };

    });
