/*! ng-alerts 2015-12-16 */
'use strict';

var app = angular.module('ngAlerts', ['ui.bootstrap'])

    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
    }]);

angular.module('ngAlerts').directive('ngAlertsCount', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    function (ngAlertsMngr, ngAlertsEvent) {
        'use strict';
    
        return {
            templateUrl: 'templates/ng-alerts/count.html',
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
angular.module('ngAlerts').directive('ngAlertsList', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    function (ngAlertsMngr, ngAlertsEvent) {
        'use strict';

        return {
            templateUrl: 'templates/ng-alerts/list.html',
            link: function ($scope, $element, $attrs) {
                function reset() {
                    $scope.alerts = ngAlertsMngr.get();
                }

                $scope.remove = function (id) {
                    ngAlertsMngr.remove(id);
                };

                $scope.$on(ngAlertsEvent.event('change'), reset);
                
                $scope.emptyList = $attrs.emptyText || 'No messages. Better get active!';

                reset();
            }
        };
    }
]);

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
                $element.removeAttr('ng-alerts-popover');
                
                // Ready with 1.0 release
//                if (!$attrs.popoverTrigger) {
//                    $element.attr('popover-trigger', 'outsideClick');
//                }
                
                $scope.templateUrl = 'templates/ng-alerts/sub/popover-list.html';
                
                $compile($element)($scope);
                
            }
        };
    }
]);
angular.module('ngAlerts').directive('ngAlertsQueue', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    '$timeout',
    function (ngAlertsMngr, ngAlertsEvent, $timeout) {
        'use strict';

        return {
            templateUrl: 'templates/ng-alerts/queue.html',
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
                
                $scope.delete = function (id) {
                    ngAlertsMngr.remove(id);
                };

                $scope.$on(ngAlertsEvent.event('remove'), function (e, id) {
                    remove(id);
                });

                $scope.$on(ngAlertsEvent.event('add'), function (e, alert) {
                    $scope.alerts.push(alert);
                    $timeout(function () {
                        remove(alert.id);
                    }, 3000);
                });
            }
        };
    }
]);
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

angular.module('ngAlerts').factory('ngAlertsId', [
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

angular.module('ngAlerts').factory('ngAlertsMngr', [
    'ngAlertsEvent',
    'NgAlert',
    'ngAlertsId',
    function (ngAlertsEvent, NgAlert, ngAlertsId) {
        'use strict';

        var alerts = [],
            mngr = {};

        function fire(name, args) {
            ngAlertsEvent.fire(name, args);
            ngAlertsEvent.fire('change', args);
        }

        mngr.get = function () {
            return angular.copy(alerts);
        };

        mngr.reset = function () {
            alerts = [];
            fire('reset');
        };

        mngr.add = function (msg) {
            var i, ids = [];
            for (i = 0; i < alerts.length; i += 1) {
                ids.push(alerts[i].id);
            }

            i = alerts.push(new NgAlert(ngAlertsId.create(ids), msg));
            fire('add', alerts[i - 1]);
        };

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
angular.module('ngAlerts').service('ngAlertsEvent', [
    '$rootScope',
    function ($rootScope) {
        'use strict';

        this.event = function (name) {
            return 'ngAlerts.' + name;
        };

        this.fire = function (name, args) {
            $rootScope.$broadcast(this.event(name), args);
        };

    }
]);
