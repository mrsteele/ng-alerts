angular.module('ngAlerts').factory('NgAlert', [
    'ngAlertsId',
    function (ngAlertsId) {
        'use strict';

        var NgAlert = function (id, msg) {
            this.id = id || ngAlertsId.create();
            this.msg = msg || '';
        };

        return NgAlert;
    }
]);
