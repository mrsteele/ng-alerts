angular.module('ngNotify').directive('ngNotifyCount', function () {
    'use strict';
    
    return {
        templateUrl: 'ng-notify/count.html',
        controller: [
            '$scope',
            'ngNotifyMngr',
            'ngNotifyEvent',
            function ($scope, ngNotifyMngr, ngNotifyEvent) {
                function reset() {
                    $scope.count = ngNotifyMngr.get().length;
                }

                reset();

                $scope.$on(ngNotifyEvent.event('change'), reset);
            }
        ]
    };
});