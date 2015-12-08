angular.module('ngNotify').directive('ngNotifyAlertArea', [function () {
    'use strict';
    
    return {
        templateUrl: 'templates/ng-notify/alert-area.html',
        controller: [
            '$scope',
            'ngNotifyMngr',
            'ngNotifyEvent',
            '$timeout',
            function ($scope, ngNotifyMngr, ngNotifyEvent, $timeout) {
                $scope.notifications = [];

                function remove(id) {
                    var i;
                    for (i = 0; i < $scope.notifications.length; i += 1) {
                        if ($scope.notifications[i].id === id) {
                            $scope.notifications.splice(i, 1);
                            return;
                        }
                    }
                }

                $scope.$on(ngNotifyEvent.event('remove'), function (e, id) {
                    remove(id);
                });

                $scope.$on(ngNotifyEvent.event('add'), function (e, notification) {
                    $scope.notifications.push(notification);
                    $timeout(function () {
                        remove(notification.id);
                    }, 3000);
                });
            }
        ]
    };
}]);