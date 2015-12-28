/**
 * An alert model.
 * @member {String} id - The unique id.
 * @member {String} msg - The message of the alert.
 * @member {String} type - The type of alert.
 */
angular.module('ngAlerts').factory('NgAlert', [
    'ngAlertsId',
    function (ngAlertsId) {
        'use strict';

        var NgAlert = function (id, msg, type) {
            this.id = id || ngAlertsId.create();
            this.msg = msg || '';
            this.type = type || 'warning';
        };

        return NgAlert;
    }
]);
