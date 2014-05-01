'use strict';

angular.module('rtdm')
    .controller('MainCtrl', function ($scope, $location) {
        $scope.gotoDashboard = function(dashboardKey) {
            $location.path('/dashboard/' + dashboardKey);
        }
    });
