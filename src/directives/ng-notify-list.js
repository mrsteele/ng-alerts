'use strict';

angular.module('ngNotify').directive('ngNotifyList', ['ngNotifyMngr', function (ngNotifyMngr) {
    return {
        templateUrl: 'ng-notify/notification-list.html'
    };
}]);
