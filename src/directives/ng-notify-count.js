angular.module('ngNotify').directive('ngNotifyCount', function () {
    'use strict';
    
    return {
        templateUrl: 'templates/ng-notify/count.html',
        scope: {
            badge: '@',
            hideEmpty: '@'
        },
        controller: [
            '$scope',
            'ngNotifyMngr',
            'ngNotifyEvent',
            function ($scope, ngNotifyMngr, ngNotifyEvent) {
                function reset() {
                    $scope.count = ngNotifyMngr.get().length;
                    
                    if ($scope.count === 0 && $scope.hideEmpty) {
                        $scope.count = '';
                    }
                }

                reset();

                $scope.$on(ngNotifyEvent.event('change'), reset);
            }
        ]
    };
});