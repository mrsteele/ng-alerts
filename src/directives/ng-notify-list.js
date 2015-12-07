angular.module('ngNotify').directive('ngNotifyList', ['ngNotifyMngr', function (ngNotifyMngr) {
    'use strict';
    
    return {
        templateUrl: 'ng-notify/list.html'
    };
}]);
