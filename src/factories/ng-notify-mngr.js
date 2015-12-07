angular.module('ngNotify').factory('ngNotifyMngr', ['ngNotifyEvent', 'NgNotification', function (ngNotifyEvent, NgNotification) {
    'use strict';
    
    var notifications = [],
        mngr = {};
    
    function fire(name) {
        ngNotifyEvent.fire(name);
        ngNotifyEvent.fire('change');
    }

    mngr.get = function () {
        return angular.copy(notifications);
    };

    mngr.reset = function () {
        notifications = [];
        fire('reset');
    };

    mngr.add = function (msg) {
        notifications.push(new NgNotification(msg));
        fire('remove');
    };

    return mngr;
}]);