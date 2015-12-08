/*! ng-notify 2015-12-07 */
'use strict';

var app = angular.module('ngNotify', [])
    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        angular.element(document).find('body').append('<ng-notify-alert-area></ng-notify-alert-area>');
    }]);

angular.module('ngNotify').directive('ngNotifyAlertArea', [function () {
    'use strict';
    
    return {
        templateUrl: 'templates/ng-notify/alert-area.html',
        controller: [
            '$scope',
            'ngNotifyMngr',
            'ngNotifyEvent',
            '$timeout',
            function ($scope, ngNotifyMngr, ngNotifyEvent, $timeout) {
                $scope.notifications = [];

                function remove(id) {
                    var i;
                    for (i = 0; i < $scope.notifications.length; i += 1) {
                        if ($scope.notifications[i].id === id) {
                            $scope.notifications.splice(i, 1);
                            return;
                        }
                    }
                }

                $scope.$on(ngNotifyEvent.event('remove'), function (e, id) {
                    remove(id);
                });

                $scope.$on(ngNotifyEvent.event('add'), function (e, notification) {
                    $scope.notifications.push(notification);
                    $timeout(function () {
                        remove(notification.id);
                    }, 3000);
                });
            }
        ]
    };
}]);
angular.module('ngNotify').directive('ngNotifyCount', [
    'ngNotifyMngr',
    'ngNotifyEvent',
    function (ngNotifyMngr, ngNotifyEvent) {
        'use strict';
    
        return {
            templateUrl: 'templates/ng-notify/count.html',
            link: function ($scope, $element, $attrs) {
                function reset() {
                    $scope.count = ngNotifyMngr.get().length;
                    $scope.badge = ($attrs.badge);

                    if ($scope.count === 0 && $attrs.hideEmpty) {
                        $scope.count = '';
                    }
                }

                reset();

                $scope.$on(ngNotifyEvent.event('change'), reset);
            }
        };
    }
]);
angular.module('ngNotify').directive('ngNotifyList', [
    'ngNotifyMngr',
    function (ngNotifyMngr) {
        'use strict';

        return {
            templateUrl: 'templates/ng-notify/list.html',
            controller: [
                '$scope',
                'ngNotifyMngr',
                'ngNotifyEvent',
                function ($scope, ngNotifyMngr, ngNotifyEvent) {
                    function reset() {
                        $scope.notifications = ngNotifyMngr.get();
                    }

                    $scope.remove = function (id) {
                        ngNotifyMngr.remove(id);
                    };

                    $scope.$on(ngNotifyEvent.event('change'), reset);

                    reset();
                }
            ]
        };
    }
]);

angular.module('ngNotify').directive('ngNotifyPopover', [
    '$compile',
    '$timeout',
    function ($compile, $timeout) {
        'use strict';

        return {
            link: function ($scope, $element, $attrs) {

                var position = $attrs.position || 'top',
                    $el = $compile('<div class="ng-notify-popover popover fade ' + position + ' in" role="tooltip" id="popover677443" style="top: 25477px; left: 266px; display: block;"><div class="arrow" style="left: 50%;"></div><div class="popover-content"><ng-notify-list></ng-notify-list></div></div>')($scope),
                    body = angular.element(document).find('body');
                
                function hidePopover(e) {
                    $el.detach();
                }
                
                function positionPopover() {
                    var rect = $element[0].getBoundingClientRect(),
                        top,
                        left;
                    
                    if (position === 'top' || position === 'bottom') {
                        top = (position === 'bottom') ? rect.bottom : rect.top + $element[0].offsetHeight;
                        left = rect.left + ($element[0].offsetWidth / 2) - ($el[0].offsetWidth / 2);
                    } else {
                        top = rect.top + ($element[0].offsetHeight / 2) - ($el[0].offsetHeight / 2);
                        left = (position === 'left') ? rect.left - $el[0].offsetWidth : rect.right + $el[0].offsetWidth;
                    }

                    $el.css({
                        top: top,
                        left: left
                    });
                }

                function interrupt(e) {
                    e.stopPropagation();
                    positionPopover();
                }

                function click(e) {
                    interrupt(e);
                    hidePopover(e);

                    body.append($el);
                    
                    positionPopover();
                }

                function destroy() {
                    $element.off('click', click);
                    body.off('click', hidePopover);
                    $el.off('click', interrupt);
                    
                    $el.remove();
                }

                $element.on('click', click);
                body.on('click', hidePopover);
                $el.on('click', interrupt);

                $scope.$on('$destroy', destroy);

            }
        };
    }
]);
angular.module('ngNotify').factory('NgNotification', [
    'ngNotifyId',
    function (ngNotifyId) {
        'use strict';

        var NgNotification = function (id, msg) {
            this.id = id || ngNotifyId.create();
            this.msg = msg || '';
        };

        return NgNotification;
    }
]);

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

angular.module('ngNotify').factory('ngNotifyMngr', [
    'ngNotifyEvent',
    'NgNotification',
    'ngNotifyId',
    function (ngNotifyEvent, NgNotification, ngNotifyId) {
        'use strict';

        var notifications = [],
            mngr = {};

        function fire(name, args) {
            ngNotifyEvent.fire(name, args);
            ngNotifyEvent.fire('change', args);
        }

        mngr.get = function () {
            return angular.copy(notifications);
        };

        mngr.reset = function () {
            notifications = [];
            fire('reset');
        };

        mngr.add = function (msg) {
            var i, ids = [];
            for (i = 0; i < notifications.length; i += 1) {
                ids.push(notifications[i].id);
            }

            i = notifications.push(new NgNotification(ngNotifyId.create(ids), msg));
            fire('add', notifications[i - 1]);
        };

        mngr.remove = function (id) {
            var i;
            for (i = 0; i < notifications.length; i += 1) {
                if (notifications[i].id === id) {
                    notifications.splice(i, 1);
                    break;
                }
            }
            fire('remove', id);
        };

        return mngr;
    }
]);
angular.module('ngNotify').service('ngNotifyEvent', [
    '$rootScope',
    function ($rootScope) {
        'use strict';

        this.event = function (name) {
            return 'ngNotify.' + name;
        };

        this.fire = function (name, args) {
            $rootScope.$broadcast(this.event(name), args);
        };

    }
]);
