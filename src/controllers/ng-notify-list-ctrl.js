'use strict';

angular.module('ngNotify').controller('ngNotifyListCtrl', ['$scope', 'ngNotifyMngr', function ($scope, ngNotifyMngr) {

    function reset() {
        $scope.notifications = ngNotifyMngr.get();
    }

    reset();
}]);