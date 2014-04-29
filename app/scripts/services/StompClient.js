angular.module('rtdm.services')
    .service('StompClient', function ($rootScope) {

        var ws = new SockJS('http://rtdm.restx.io/stomp');
        var client = Stomp.over(ws);

        // SockJS does not support heart-beat: disable heart-beats
        client.heartbeat.outgoing = 0;
        client.heartbeat.incoming = 0;

        var connected = false;
        var registrationsQueue = [];

        function doSubscribe(registration) {
            if (registration.cancel) {
                console.log('a registration was cancelled before actual subscription: ', registration);
                return;
            }
            registration.subscription = client.subscribe(registration.topic, function (d) {
                console.log('SockJS Event', d);
                $rootScope.$apply(function () {
                    registration.callback(angular.fromJson(d.body));
                });
            })
        }

        return {
            connect: function () {
                if (connected) {
                    return;
                }

                client.connect('rtdm', '535d500f07b286492e4433af',
                    // on connect
                    function () {
                        connected = true;
                        registrationsQueue.forEach(doSubscribe);
                        registrationsQueue = [];
                    },
                    // on error
                    function (message) {
                        console.log('SockJS Error', message);
                    },
                    '/');
            },
            subscribe: function (registration) {
                if (!connected) {
                    registrationsQueue.push(registration)
                } else {
                    doSubscribe(registration);
                }
            },
            unsubscribe: function (registration) {
                if (registration.subscription) {
                    registration.subscription.unsubscribe();
                } else {
                    registration.cancel = true;
                }
            }
        };
    });
