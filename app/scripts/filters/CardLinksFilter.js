'use strict';

angular.module('rtdm.ui')
    .filter('cardLinks', function () {

        return function (array, category) {
            return _.filter(array, { category: category });
        };
    });