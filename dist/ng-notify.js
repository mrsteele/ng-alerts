/*! ng-notify 2015-12-05 */
'use strict';

var app = angular.module('ngNotify', []);

'use strict';

angular.module('ngNotify').controller('ngNotifyListCtrl', ['$scope', 'ngNotifyMngr', function ($scope, ngNotifyMngr) {

    function reset() {
        $scope.notifications = ngNotifyMngr.get();
    }

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


angular.module('ngNotify').factory('ngNotifyMngr', ['NgNotification', function (NgNotification) {
    var notifications = [],
        mngr = {};

    mngr.get = function () {
        return angular.copy(notifications);
    };

    mngr.empty = function () {
        notifications = [];
    };

    mngr.add = function (msg) {
        notifications.push(new NgNotification(msg));
    };

    mngr.add('testing');

    return mngr;
}]);