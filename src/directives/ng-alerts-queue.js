/**
 * Used internally to show the alert queue.
 */
angular.module('ngAlerts').directive('ngAlertsQueue', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    '$timeout',
    'ngAlerts',
    function (ngAlertsMngr, ngAlertsEvent, $timeout, ngAlerts) {
        'use strict';

        return {
            templateUrl: 'template/ng-alerts/queue.html',
            link: function ($scope) {
                $scope.alerts = [];

                /**
                 * Removes a specific alert by id.
                 */
                function remove(id) {
                    var i;
                    for (i = 0; i < $scope.alerts.length; i += 1) {
                        if ($scope.alerts[i].id === id) {
                            $scope.alerts.splice(i, 1);
                            return;
                        }
                    }
                }

                $scope.location = ngAlerts.options.queueLocation;

                /**
                 * Public remove script.
                 */
                $scope.remove = function (id) {
                    ngAlertsMngr.remove(id);
                };

                $scope.$on(ngAlertsEvent.event('remove'), function (e, id) {
                    remove(id);
                });

                $scope.$on(ngAlertsEvent.event('add'), function (e, alert) {
                    if (ngAlerts.options.queue) {
                        $scope.alerts.push(alert);
                        $timeout(function () {
                            remove(alert.id);
                        }, ngAlerts.options.queueTimeout);
                    }
                });
            }
        };
    }
]);
