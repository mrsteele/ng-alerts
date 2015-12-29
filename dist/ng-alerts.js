/*! ng-alerts 2015-12-28 */
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
                function reset() {
                    $scope.alerts = ngAlertsMngr.get();
                }

                $scope.remove = function (id) {
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
                
                $element.attr('uib-popover-template', 'templateUrl');
                $element.attr('popover-is-open', 'isOpen');
                $element.removeAttr('ng-alerts-popover');
                
                // Ready with 1.0 release
//                if (!$attrs.popoverTrigger) {
//                    $element.attr('popover-trigger', 'outsideClick');
//                }
                
                // Custom classes not available yet
                //$element.attr('popover-class', 'ng-alerts-popover-list');
                
                $scope.templateUrl = 'template/ng-alerts/sub/popover-list.html';
                $scope.emptyText = $attrs.emptyText;
                
                $scope.isOpen = false;
                $scope.closePopover = function () {
                    $scope.isOpen = false;
                };
                
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
        mngr.add = function (msg, type) {
            var i, ids = [];
            for (i = 0; i < alerts.length; i += 1) {
                ids.push(alerts[i].id);
            }

            i = alerts.push(new NgAlert(ngAlertsId.create(ids), msg, type));
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
    "<span ng-class=\"{'badge': badge}\">{{count}}</span>\r" +
    "\n"
  );


  $templateCache.put('template/ng-alerts/list.html',
    "<div class=\"ng-alerts-list\">\r" +
    "\n" +
    "    <div ng-show=\"alerts.length > 0\">\r" +
    "\n" +
    "        <table class=\"table table-hover table-condensed\">\r" +
    "\n" +
    "            <thead>\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <th colspan=\"2\">Message</th>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </thead>\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "                <tr ng-repeat=\"alert in alerts\" class=\"{{alert.type}}\">\r" +
    "\n" +
    "                    <td>\r" +
    "\n" +
    "                        {{alert.msg}}\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                    <td>\r" +
    "\n" +
    "                        <button ng-click=\"remove(alert.id)\" type=\"button\" class=\"close\" aria-label=\"Close\">\r" +
    "\n" +
    "                            <span aria-hidden=\"true\">&times;</span>\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-show=\"alerts.length === 0\">\r" +
    "\n" +
    "        {{emptyList}}\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('template/ng-alerts/queue.html',
    "<div id=\"ng-alerts-queue\" class=\"{{location}}\">\r" +
    "\n" +
    "    <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"remove(alert.id)\">\r" +
    "\n" +
    "        {{alert.msg}}\r" +
    "\n" +
    "    </uib-alert>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('template/ng-alerts/sub/popover-list.html',
    "<div>\r" +
    "\n" +
    "    <h2 class=\"popover-title clearfix\">\r" +
    "\n" +
    "        <a class=\"pull-right\" ng-click=\"closePopover()\">&times;</a>\r" +
    "\n" +
    "    </h2>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <ng-alerts-list empty-text=\"{{emptyText}}\"></ng-alerts-list>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);
