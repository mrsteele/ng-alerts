/**
 * Manages all notification systems.
 */
angular.module('ngAlerts').factory('ngAlertsMngr', [
    'ngAlertsEvent',
    'NgAlert',
    'ngAlertsId',
    function (ngAlertsEvent, NgAlert, ngAlertsId) {
        'use strict';

        var alerts = [],
            mngr = {};

        /**
         * Fires an alert event.
         * @param {String} name - The name of the event.
         * @param {Object=} args - Any optional arguments.
         */
        function fire(name, args) {
            ngAlertsEvent.fire(name, args);
            ngAlertsEvent.fire('change', args);
        }

        /**
         * Gets the alerts.
         * @returns {NgAlert[]} An array of alerts.
         */
        mngr.get = function () {
            return angular.copy(alerts);
        };

        /**
         * Resets the alerts in storage.
         */
        mngr.reset = function () {
            alerts = [];
            fire('reset');
        };

        /**
         * Adds a new alert
         * @param {String} msg - The message in the alert.
         * @param {String} type - The alert type (success, warning, etc...).
         */
        mngr.add = function (msg, type) {
            var i, ids = [];
            for (i = 0; i < alerts.length; i += 1) {
                ids.push(alerts[i].id);
            }

            i = alerts.push(new NgAlert(ngAlertsId.create(ids), msg, type));
            fire('add', alerts[i - 1]);
        };

        /**
         * Removes a specific alert.
         * @param {String} id - The unique identifier of the alert.
         */
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