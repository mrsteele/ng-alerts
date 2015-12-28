/**
 * Provides event systems to ngAlerts.
 */
angular.module('ngAlerts').service('ngAlertsEvent', [
    '$rootScope',
    function ($rootScope) {
        'use strict';

        /**
         * Creates an event string.
         * @param {String} name - The name of the event.
         * @returns {String} The proper prefixed event string.
         */
        this.event = function (name) {
            return 'ngAlerts.' + name;
        };

        /**
         * Fires an event.
         * @param {String} name - the event name.
         * @param {Object=} args - Any arguments needed.
         */
        this.fire = function (name, args) {
            $rootScope.$broadcast(this.event(name), args);
        };

    }
]);
