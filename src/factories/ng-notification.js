angular.module('ngNotify').factory('NgNotification', [
    'ngNotifyId',
    function (ngNotifyId) {
        'use strict';

        var NgNotification = function (id, msg) {
            this.id = id || ngNotifyId.create();
            this.msg = msg || '';
        };

        return NgNotification;
    }
]);
