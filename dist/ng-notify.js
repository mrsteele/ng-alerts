/*! ng-notify 2015-12-06 */
'use strict';

var app = angular.module('ngNotify', [])
    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        var notifyScope = $rootScope.$new();
        var tpl = $compile('<ng-notify-alert-area></ng-notify-alert-area>')(notifyScope);
        
        angular.element(document).find('body').append(tpl);
    }]);

angular.module('ngNotify').directive('ngNotifyAlertArea', [function () {
    return {
        templateUrl: 'templates/ng-notify/alert-area.html',
        controller: ['$scope', 'ngNotifyMngr', 'ngNotifyEvent', function ($scope, ngNotifyMngr, ngNotifyEvent) {
            $scope.notifications = [];
            
            $scope.$on(ngNotifyEvent.event('add'), function () {
                var notifications = ngNotifyMngr.get();
                notifications.push(notifications[notifications.length - 1]);
            })
        }]
    };
}]);
angular.module('ngNotify').directive('ngNotifyCount', function () {
    'use strict';
    
    return {
        templateUrl: 'templates/ng-notify/count.html',
        scope: {
            badge: '@',
            hideEmpty: '@'
        },
        controller: [
            '$scope',
            'ngNotifyMngr',
            'ngNotifyEvent',
            function ($scope, ngNotifyMngr, ngNotifyEvent) {
                function reset() {
                    $scope.count = ngNotifyMngr.get().length;
                    
                    if ($scope.count === 0 && $scope.hideEmpty) {
                        $scope.count = '';
                    }
                }

                reset();

                $scope.$on(ngNotifyEvent.event('change'), reset);
            }
        ]
    };
});
angular.module('ngNotify').directive('ngNotifyList', ['ngNotifyMngr', function (ngNotifyMngr) {
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

                $scope.$on(ngNotifyEvent.event('change'), reset);

                reset();
            }
        ]
    };
}]);

angular.module('ngNotify').directive('ngNotifyPopover', ['$compile', '$timeout', function ($compile, $timeout) {
    'use strict';
    
    return {
        scope: {
            position: '@'
        },
        link: function ($scope, $element) {
            
            var position = $scope.position || 'top',
                $el = $compile('<div class="popover fade ' + position + ' in" role="tooltip" id="popover677443" style="top: 25477px; left: 266px; display: block;"><div class="arrow" style="left: 50%;"></div><div class="popover-content"><ng-notify-list></ng-notify-list></div></div>')($scope),
                body = angular.element(document).find('body');
            
            function hidePopover() {
                $el.remove();
                body.off('click', hidePopover);
            }
            
            function click() {
                body.off('click', hidePopover);
                var rect = $element[0].getBoundingClientRect(),
                    top,
                    left;
                
                body.append($el);
                    
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
                
                // clicking anywhere else deletes the $el
                $timeout(function () {
                    body.on('click', hidePopover);
                });
            }
            
            function destroy() {
                $element.off('click', click);
                body.off('click', hidePopover);
            }
            
            $element.on('click', click);
            
            $scope.$on('$destroy', destroy);
            
        }
    };
}]);
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

angular.module('ngNotify').factory('ngNotifyMngr', ['ngNotifyEvent', 'NgNotification', function (ngNotifyEvent, NgNotification) {
    'use strict';
    
    var notifications = [],
        mngr = {};
    
    function fire(name) {
        ngNotifyEvent.fire(name);
        ngNotifyEvent.fire('change');
    }

    mngr.get = function () {
        return angular.copy(notifications);
    };

    mngr.reset = function () {
        notifications = [];
        fire('reset');
    };

    mngr.add = function (msg) {
        notifications.push(new NgNotification(msg));
        fire('add');
    };

    return mngr;
}]);
angular.module('ngNotify').service('ngNotifyEvent', ['$rootScope', function ($rootScope) {
    'use strict';
    
    this.event = function (name) {
        return 'ngNotify.' + name;
    };
    
    this.fire = function (name) {
        $rootScope.$broadcast(this.event(name));
    };

}]);
