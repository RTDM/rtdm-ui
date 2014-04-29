'use strict';

angular.module('rtdm.ui')
    .filter('cardStatus', function () {

        return function (array, status) {

            var _array = [];
            angular.forEach(array, function (elt) {
                if (elt.status === status) {
                    _array.push(elt);
                }
            });

            return _array;
        };
    });