angular.module('ngNotify').directive('ngNotifyList', [
    'ngNotifyMngr',
    function (ngNotifyMngr) {
        'use strict';

        return {
            templateUrl: 'templates/ng-notify/list.html',
            controller: [
                '$scope',
                'ngNotifyMngr',
                'ngNotifyEvent',
                function ($scope, ngNotifyMngr, ngNotifyEvent) {
                    function reset() {
                        $scope.notifications = ngNotifyMngr.get();
                    }

                    $scope.remove = function (id) {
                        ngNotifyMngr.remove(id);
                    };

                    $scope.$on(ngNotifyEvent.event('change'), reset);

                    reset();
                }
            ]
        };
    }
]);
