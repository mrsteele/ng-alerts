/**
 * Manages all notification systems.
 */
angular.module('ngAlerts').factory('ngAlertsUtils', [
    function () {
        'use strict';

        var utils = {},
            TIME = {};

        /**
         * Checks for plurality.
         * @param {String} word - The singular word.
         * @param {Number} value - The value to test for plurality.
         * @param {String} [plural=@word + s] - Defaults to the word with an appended s.
         * @returns {String} Which word to use.
         */
        utils.plural = function (word, value, plural) {
            plural = plural || word + 's';
            return (value === 1) ? word : plural;
        };

        // buil TIME
        TIME.minute = 60;
        TIME.hour = TIME.minute * 60;
        TIME.day = TIME.hour * 24;
        TIME.week = TIME.day * 7;
        TIME.month = TIME.day * 30;
        TIME.year = TIME.day * 365;

        /**
         * An estimated time since the given timestamp.
         * @param {Number} timestamp - Number of miliseconds since Jan 1 1970.
         * @returns {String} estimated value.
         */
        utils.timeSince = function (timestamp) {

            var r = 0,
                field = '',
                seconds = Math.floor((Date.now() - timestamp) / 1000);

            if (seconds < TIME.minute) {
                return seconds + ' ' + utils.plural('second', seconds) + ' ago';
            } else {
                if (seconds < TIME.hour) {
                    r = Math.round(seconds / TIME.minute);
                    field = 'minute';
                } else if (seconds < TIME.day) {
                    r = Math.round(seconds / TIME.hour);
                    field = 'hour';
                } else if (seconds < TIME.week) {
                    r = Math.round(seconds / TIME.day);
                    field = 'day';
                } else if (seconds < TIME.month) {
                    r = Math.round(seconds / TIME.week);
                    field = 'week';
                } else if (seconds < TIME.year) {
                    r = Math.round(seconds / TIME.month);
                    field = 'month';
                } else {
                    r = Math.round(seconds / TIME.year);
                    field = 'year';
                }
                return 'About ' + r + ' ' + utils.plural(field, r) + ' ago';
            }
        };

        return utils;
    }
]);
