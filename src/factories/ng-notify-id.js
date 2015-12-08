angular.module('ngNotify').factory('ngNotifyId', [
    function () {
        'use strict';

        var factory = {};

        factory.create = function (existing) {
            existing = existing || [];

            var ret;

            do {
                ret = Date.now();
            } while (existing.indexOf(ret) !== -1);

            return ret;
        };

        return factory;
    }
]);
