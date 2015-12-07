angular.module('ngNotify').directive('ngNotifyAlertArea', [function () {
    return {
        templateUrl: 'templates/ng-notify/alert-area.html',
        controller: ['$scope', 'ngNotifyMngr', 'ngNotifyEvent', function ($scope, ngNotifyMngr, ngNotifyEvent) {
            $scope.notifications = [];
            
            $scope.$on(ngNotifyEvent.event('add'), function () {
                var notifications = ngNotifyMngr.get();
                notifications.push(notifications[notifications.length - 1]);
            })
        }]
    };
}]);