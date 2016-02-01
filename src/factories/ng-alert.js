/**
 * An alert model.
 * @member {String} id - The unique id.
 * @member {String} msg - The message of the alert.
 * @member {String} type - The type of alert.
 */
angular.module('ngAlerts').factory('NgAlert', [
    'ngAlertsId',
    'ngAlertsUtils',
    function (ngAlertsId, ngAlertsUtils) {
        'use strict';

        /**
         * The alert object.
         * @param {Object} args - The argument object.
         * @param {Number} args.id - The unique id.
         * @param {String} args.msg - The message.
         * @param {String} [args.type=default] - The type of alert.
         * @param {Number} [args.time=Date.now()] - The time of the notification (Miliseconds since Jan 1 1970).
         */
        var NgAlert = function (args) {
            var params = angular.extend({
                id: ngAlertsId.create(),
                msg: '',
                type: 'default',
                time: Date.now()
            }, args);

            this.id = params.id;
            this.msg = params.msg;
            this.type = params.type;
            this.time = params.time;
        };

        /**
         * Returns the time using the ngAlertsUtils.
         * @returns {String}
         */
        NgAlert.prototype.getTime = function () {
            return ngAlertsUtils.timeSince(this.time);
        };

        return NgAlert;
    }
]);
