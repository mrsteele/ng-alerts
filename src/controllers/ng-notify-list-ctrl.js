angular.module('ngNotify').controller('ngNotifyListCtrl', ['$scope', 'ngNotifyMngr', 'ngNotifyEvent', function ($scope, ngNotifyMngr, ngNotifyEvent) {
    'use strict';
    
    function reset() {
        $scope.notifications = ngNotifyMngr.get();
    }
    
    $scope.$on(ngNotifyEvent.event('change'), reset);
    
    reset();
}]);