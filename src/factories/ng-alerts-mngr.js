angular.module('ngAlerts').factory('ngAlertsMngr', [
    'ngAlertsEvent',
    'NgAlert',
    'ngAlertsId',
    function (ngAlertsEvent, NgAlert, ngAlertsId) {
        'use strict';

        var alerts = [],
            mngr = {};

        function fire(name, args) {
            ngAlertsEvent.fire(name, args);
            ngAlertsEvent.fire('change', args);
        }

        mngr.get = function () {
            return angular.copy(alerts);
        };

        mngr.reset = function () {
            alerts = [];
            fire('reset');
        };

        mngr.add = function (msg) {
            var i, ids = [];
            for (i = 0; i < alerts.length; i += 1) {
                ids.push(alerts[i].id);
            }

            i = alerts.push(new NgAlert(ngAlertsId.create(ids), msg));
            fire('add', alerts[i - 1]);
        };

        mngr.remove = function (id) {
            var i;
            for (i = 0; i < alerts.length; i += 1) {
                if (alerts[i].id === id) {
                    alerts.splice(i, 1);
                    break;
                }
            }
            fire('remove', id);
        };

        return mngr;
    }
]);