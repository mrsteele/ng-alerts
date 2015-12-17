angular.module('ngAlerts').directive('ngAlertsList', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    'ngAlerts',
    function (ngAlertsMngr, ngAlertsEvent, ngAlerts) {
        'use strict';

        return {
            templateUrl: 'templates/ng-alerts/list.html',
            link: function ($scope, $element, $attrs) {
                function reset() {
                    $scope.alerts = ngAlertsMngr.get();
                }

                $scope.remove = function (id) {
                    ngAlertsMngr.remove(id);
                };

                $scope.$on(ngAlertsEvent.event('change'), reset);
                
                $scope.emptyList = $attrs.emptyText || ngAlerts.options.emptyListText;

                reset();
            }
        };
    }
]);
