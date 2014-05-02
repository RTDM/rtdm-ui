'use strict';

angular.module('rtdm.services')
    .factory('Dashboard', function ($resource) {

        var Dashboard = $resource('/api/dashboard/:key/:things');

        return angular.extend({
            getCards: function (dashboardKey, handler) {
                return Dashboard.query({
                    key: dashboardKey,
                    things: 'cards'
                }, handler);
            },
            getActivities: function (dashboardKey) {
                return Dashboard.query({
                    key: dashboardKey,
                    things: 'activities'
                });
            }
        }, Dashboard);
    });
