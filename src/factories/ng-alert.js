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
