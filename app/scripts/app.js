'use strict';

angular.module('rtdm', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .service('wsClient', function() {
        var ws = new SockJS('http://rtdm.restx.io/stomp');
        var client = Stomp.over(ws);

        // SockJS does not support heart-beat: disable heart-beats
        client.heartbeat.outgoing = 0;
        client.heartbeat.incoming = 0;

        return client;
    })
    .run(function(wsClient, $rootScope) {
        wsClient.connect('rtdm', '535d500f07b286492e4433af',
            // on connect
            function() {
                var id = wsClient.subscribe("/topic/test", function(d) {
                    console.log('SockJS Event', d);

                    $rootScope.$apply(function() {
                        $rootScope.$broadcast('ws', angular.fromJson(d.body));
                    });
                });
            },
            // on error
            function(message) {
                console.log('SockJS Error', message);
            },
            '/');

        // test sending event from console
        // angular.element(document.body).injector().get('wsClient').send('/topic/test', {"content-type":"application/json"}, '{ "event": "CARD_UPDATED"}')
    })
;
