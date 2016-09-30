/*! ng-alerts 1.0.6 2016-09-30 */
'use strict';

angular.module('ngAlerts', ['ui.bootstrap'])
    
    /**
     * Use this provider to configure defaults.
     * @param {Object} options - The options to configure.
     * @param {String=No messages} options.emptyListText - The default empty list text.
     * @param {Number=3000} options.queueTimeout - The miliseconds till an alert timesout.
     * @param {String=bottom right} options.queueLocation - The location of the queue (i.e. "top left" or "bottom right", etc...).
     * @param {Bool=true} options.queue - Whether or not to use the queue or not.
     * @returns {Object} The default options, specifically an object with an "options" parameter.
     */
    .provider('ngAlerts', function () {
        
        // defaults
        this.options = {
            emptyListText: 'No messages',
            queueTimeout: 3000,
            queueLocation: 'bottom right',
            queue: true
        };
        
        this.$get = function () {
            return this;
        };
    })

    /**
     * Called when this module runs. Specifically it adds the queue object to the stage.
     */
    .run(function () {
        angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
    });

/**
 * Shows a simple alert total.
 * @param {Bool=} badge - To show the number as a badge.
 * @param {Bool=} hide-empty - To not display anything if the number is 0.
 */
angular.module('ngAlerts').directive('ngAlertsCount', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    function (ngAlertsMngr, ngAlertsEvent) {
        'use strict';

        return {
            templateUrl: 'template/ng-alerts/count.html',
            link: function ($scope, $element, $attrs) {
                
                /**
                 * Resets the alert count view.
                 */
                function reset() {
                    $scope.count = ngAlertsMngr.get().length;
                    $scope.badge = ($attrs.badge);

                    if ($scope.count === 0 && $attrs.hideEmpty) {
                        $scope.count = '';
                    }
                }

                reset();

                $scope.$on(ngAlertsEvent.event('change'), reset);
            }
        };
    }
]);

/**
 * Lists all alerts.
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 */
angular.module('ngAlerts').directive('ngAlertsList', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    'ngAlerts',
    function (ngAlertsMngr, ngAlertsEvent, ngAlerts) {
        'use strict';

        return {
            templateUrl: 'template/ng-alerts/list.html',
            link: function ($scope, $element, $attrs) {
                
                /**
                 * Resets the list view.
                 */
                function reset() {
                    $scope.alerts = ngAlertsMngr.get();
                }

                /**
                 * Removes an alert item from the list.
                 */
                $scope.remove = function (id, $event) {
                    $event.stopImmediatePropagation();
                    ngAlertsMngr.remove(id);
                };

                $scope.$on(ngAlertsEvent.event('change'), reset);

                $scope.emptyList = $attrs.emptyText || ngAlerts.options.emptyListText;

                reset();
            }
        };
    }
]);

/**
 * Wraps a popover object to the handler (using the angular bootstrap "popover" directive).
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 * @see https://angular-ui.github.io/bootstrap/#/popover
 */
angular.module('ngAlerts').directive('ngAlertsModal', [
    'ngAlertsEvent',
    '$uibModal',
    '$compile',
    '$timeout',
    '$sce',
    function (ngAlertsEvent, $uibModal, $compile, $timeout, $sce) {
        'use strict';

        return {
            restrict: 'A',
            terminal: true,
            priority: 1000,
            link: function ($scope, $element, $attrs) {

                $element.attr('ng-click', 'openModal()');
                $element.removeAttr('ng-alerts-modal');

                $scope.emptyText = $attrs.emptyText;

                /**
                 * Opens a modal with the list of alerts created.
                 */
                $scope.openModal = function () {
                    $scope.modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'template/ng-alerts/sub/modal-list.html',
                        size: $attrs.size || 'lg'
                    });

                    $scope.modalInstance.result.then(function () {
                        $scope.modalInstance = null;
                    });
                };

                $compile($element)($scope);

            }
        };
    }
]);

/**
 * Wraps a popover object to the handler (using the angular bootstrap "popover" directive).
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 * @see https://angular-ui.github.io/bootstrap/#/popover
 */
angular.module('ngAlerts').directive('ngAlertsPopover', [
    'ngAlertsEvent',
    '$compile',
    '$timeout',
    '$sce',
    function (ngAlertsEvent, $compile, $timeout, $sce) {
        'use strict';

        return {
            restrict: 'A',
            terminal: true,
            priority: 1000,
            link: function ($scope, $element, $attrs) {

                if (!$attrs.uibPopoverTemplate) {
                    $element.attr('uib-popover-template', 'templateUrl');
                }

                if (!$attrs.popoverIsOpen) {
                    $element.attr('popover-is-open', 'isOpen');
                }

                $element.removeAttr('ng-alerts-popover');

                if (!$attrs.popoverTrigger) {
                    $element.attr('popover-trigger', 'outsideClick');
                }

                if (!$attrs.popoverClass) {
                    $element.attr('popover-class', 'ng-alerts-popover-list');
                }

                $scope.templateUrl = 'template/ng-alerts/sub/popover-list.html';
                $scope.emptyText = $attrs.emptyText;

                $compile($element)($scope);

            }
        };
    }
]);

/**
 * Used internally to show the alert queue.
 */
angular.module('ngAlerts').directive('ngAlertsQueue', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    '$timeout',
    'ngAlerts',
    function (ngAlertsMngr, ngAlertsEvent, $timeout, ngAlerts) {
        'use strict';

        return {
            templateUrl: 'template/ng-alerts/queue.html',
            link: function ($scope) {
                $scope.alerts = [];

                /**
                 * Removes a specific alert by id.
                 */
                function remove(id) {
                    var i;
                    for (i = 0; i < $scope.alerts.length; i += 1) {
                        if ($scope.alerts[i].id === id) {
                            $scope.alerts.splice(i, 1);
                            return;
                        }
                    }
                }

                $scope.location = ngAlerts.options.queueLocation;

                /**
                 * Public remove script.
                 */
                $scope.remove = function (id) {
                    ngAlertsMngr.remove(id);
                };

                $scope.$on(ngAlertsEvent.event('remove'), function (e, id) {
                    remove(id);
                });

                $scope.$on(ngAlertsEvent.event('add'), function (e, alert) {
                    if (ngAlerts.options.queue) {
                        $scope.alerts.push(alert);
                        $timeout(function () {
                            remove(alert.id);
                        }, ngAlerts.options.queueTimeout);
                    }
                });
            }
        };
    }
]);

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
        mngr.add = function (data) {
            var i, ids = [];
            if (!data.id) {
                for (i = 0; i < alerts.length; i += 1) {
                    ids.push(alerts[i].id);
                }

                data.id = ngAlertsId.create(ids);
            }

            i = alerts.push(new NgAlert(data));
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
angular.module('ngAlerts').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/ng-alerts/count.html',
    "<span ng-class=\"{'badge': badge}\">{{count}}</span>\n"
  );


  $templateCache.put('template/ng-alerts/list.html',
    "<div class=\"ng-alerts-list\">\n" +
    "    <div ng-show=\"alerts.length > 0\">\n" +
    "        <table class=\"table table-hover table-condensed\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"alert in alerts\" ng-class=\"alert.type\">\n" +
    "                    <td>\n" +
    "                        <small>{{alert.getTime()}}</small><br />\n" +
    "                        {{alert.msg}}\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <button ng-click=\"remove(alert.id, $event)\" type=\"button\" class=\"close\" aria-label=\"Close\">\n" +
    "                            <span aria-hidden=\"true\">&times;</span>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div class=\"empty-list\" ng-show=\"alerts.length === 0\">\n" +
    "        {{emptyList}}\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('template/ng-alerts/queue.html',
    "<div id=\"ng-alerts-queue\" class=\"{{location}}\">\n" +
    "    <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"remove(alert.id)\">\n" +
    "        {{alert.msg}}\n" +
    "    </uib-alert>\n" +
    "</div>\n"
  );


  $templateCache.put('template/ng-alerts/sub/modal-list.html',
    "<div>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">\n" +
    "            Notifications\n" +
    "            <button type=\"button\" ng-click=\"$dismiss()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "        </h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <ng-alerts-list empty-text=\"{{emptyText}}\"></ng-alerts-list>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"$dismiss()\">Close</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('template/ng-alerts/sub/popover-list.html',
    "<div>\n" +
    "    <div class=\"popover-content\">\n" +
    "        <ng-alerts-list empty-text=\"{{emptyText}}\"></ng-alerts-list>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
