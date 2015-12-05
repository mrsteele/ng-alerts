/*! ng-notify 2015-12-05 */
'use strict';

var app = angular.module('ngNotify', []);

'use strict';

angular.module('ngNotify').controller('ngNotifyListCtrl', ['$scope', 'ngNotifyMngr', 'ngNotifyEvent', function ($scope, ngNotifyMngr, ngNotifyEvent) {

    function reset() {
        $scope.notifications = ngNotifyMngr.get();
    }
    
    $scope.$on(ngNotifyEvent.event('change'), reset);
    
    reset();
}]);
'use strict';

angular.module('ngNotify').directive('ngNotifyList', ['ngNotifyMngr', function (ngNotifyMngr) {
    return {
        templateUrl: 'ng-notify/notification-list.html'
    };
}]);


angular.module('ngNotify').factory('NgNotification', function () {
    var NgNotification = function (msg) {
        this.msg = msg || '';
    };

    NgNotification.prototype.getMsg = function () {
        return this.msg;
    };

    return NgNotification;
});


angular.module('ngNotify').factory('ngNotifyMngr', ['ngNotifyEvent', 'NgNotification', function (ngNotifyEvent, NgNotification) {
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
'use strict';

angular.module('ngNotify').service('ngNotifyEvent', ['$rootScope', function ($rootScope) {
    
    this.event = function (name) {
        return 'ngNotify.' + name;
    };
    
    this.fire = function (name) {
        $rootScope.$broadcast(this.event(name));
    };

}]);
