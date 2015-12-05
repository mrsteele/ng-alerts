/*! ng-notify 2015-12-05 */
'use strict';

(function (angular) {
    
    // the app itself
    var app = angular.module('ngNotify', []);
    
    // template
    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put(
            'ng-notify-tplv1.html',
            '<div class="alert"></div>'
        );
    }]);
    
    // model
    app.factory('NgNotification', function () {
        var NgNotification = function (msg) {
            msg = msg || '';
            
            this.raw = {
                msg: msg
            };
        };
        
        NgNotification.prototype.getMsg = function () {
            return this.raw.msg;
        };
        
        return NgNotification;
    });
    
    // factory
    app.factory('ngNotifyMngr', ['NgNotification', function (NgNotification) {
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
    
    // controller
    app.controller('ngNotifyListCtrl', ['$scope', 'ngNotifyMngr', function ($scope, ngNotifyMngr) {
        
        function reset() {
            $scope.notifications = ngNotifyMngr.get();
        }
        
        reset();
    }]);
    
    // directives
    app.directive('ngNotifyList', ['ngNotifyMngr', function (ngNotifyMngr) {
        return {
            templateUrl: 'ng-notify/notification-list.html'
        };
    }]);
    
}(angular));