/**
 * Assists with writing unique identifiers.
 */
angular.module('ngAlerts').factory('ngAlertsId', [
    function () {
        'use strict';

        var factory = {};

        /**
         * Creates a unique identifier.
         * @param {String[]=} existing - An optional list of existing identifiers to verify uniqueness.
         * @returns {String} The unique identifier.
         */
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
