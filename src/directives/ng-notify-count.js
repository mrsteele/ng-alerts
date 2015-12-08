angular.module('ngNotify').directive('ngNotifyCount', [
    'ngNotifyMngr',
    'ngNotifyEvent',
    function (ngNotifyMngr, ngNotifyEvent) {
        'use strict';
    
        return {
            templateUrl: 'templates/ng-notify/count.html',
            link: function ($scope, $element, $attrs) {
                function reset() {
                    $scope.count = ngNotifyMngr.get().length;
                    $scope.badge = ($attrs.badge);

                    if ($scope.count === 0 && $attrs.hideEmpty) {
                        $scope.count = '';
                    }
                }

                reset();

                $scope.$on(ngNotifyEvent.event('change'), reset);
            }
        };
    }
]);