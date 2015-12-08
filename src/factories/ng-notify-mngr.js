angular.module('ngNotify').factory('ngNotifyMngr', [
    'ngNotifyEvent',
    'NgNotification',
    'ngNotifyId',
    function (ngNotifyEvent, NgNotification, ngNotifyId) {
        'use strict';

        var notifications = [],
            mngr = {};

        function fire(name, args) {
            ngNotifyEvent.fire(name, args);
            ngNotifyEvent.fire('change', args);
        }

        mngr.get = function () {
            return angular.copy(notifications);
        };

        mngr.reset = function () {
            notifications = [];
            fire('reset');
        };

        mngr.add = function (msg) {
            var i, ids = [];
            for (i = 0; i < notifications.length; i += 1) {
                ids.push(notifications[i].id);
            }

            i = notifications.push(new NgNotification(ngNotifyId.create(ids), msg));
            fire('add', notifications[i - 1]);
        };

        mngr.remove = function (id) {
            var i;
            for (i = 0; i < notifications.length; i += 1) {
                if (notifications[i].id === id) {
                    notifications.splice(i, 1);
                    break;
                }
            }
            fire('remove', id);
        };

        return mngr;
    }
]);