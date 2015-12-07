/*! ng-notify 2015-12-06 */
'use strict';

var app = angular.module('ngNotify', []);

angular.module('ngNotify').controller('ngNotifyListCtrl', ['$scope', 'ngNotifyMngr', 'ngNotifyEvent', function ($scope, ngNotifyMngr, ngNotifyEvent) {
    'use strict';
    
    function reset() {
        $scope.notifications = ngNotifyMngr.get();
    }
    
    $scope.$on(ngNotifyEvent.event('change'), reset);
    
    reset();
}]);
angular.module('ngNotify').directive('ngNotifyCount', function () {
    'use strict';
    
    return {
        templateUrl: 'ng-notify/count.html',
        controller: [
            '$scope',
            'ngNotifyMngr',
            'ngNotifyEvent',
            function ($scope, ngNotifyMngr, ngNotifyEvent) {
                function reset() {
                    $scope.count = ngNotifyMngr.get().length;
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
        templateUrl: 'ng-notify/list.html',
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
        fire('remove');
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
