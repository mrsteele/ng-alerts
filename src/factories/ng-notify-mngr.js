
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