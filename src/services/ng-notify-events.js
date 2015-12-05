'use strict';

angular.module('ngNotify').service('ngNotifyEvent', ['$rootScope', function ($rootScope) {
    
    this.event = function (name) {
        return 'ngNotify.' + name;
    };
    
    this.fire = function (name) {
        $rootScope.$broadcast(this.event(name));
    };

}]);
