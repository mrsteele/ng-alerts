angular.module('ngNotify').factory('NgNotification', function () {
    'use strict';
    
    var NgNotification = function (msg) {
        this.msg = msg || '';
    };

    NgNotification.prototype.getMsg = function () {
        return this.msg;
    };

    return NgNotification;
});
