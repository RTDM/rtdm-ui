'use strict';

angular.module('rtdm')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.activities = [];
        $http.get('/api/activities').success(function(data) {
            $scope.activities = data;
        });

        $scope.$on('ws', function(event, data) {
            $scope.activities.push(data);
        });
    });
