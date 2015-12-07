angular.module('ngNotify').controller('ngNotifyCountCtrl', ['$scope', 'ngNotifyMngr', 'ngNotifyEvent', function ($scope, ngNotifyMngr, ngNotifyEvent) {
    'use strict';
    
    function reset() {
        $scope.count = ngNotifyMngr.get().length;
    }
    
    reset();
    
    $scope.$on(ngNotifyEvent.event('change'), reset);
}]);