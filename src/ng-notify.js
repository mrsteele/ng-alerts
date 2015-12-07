'use strict';

var app = angular.module('ngNotify', [])
    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        var notifyScope = $rootScope.$new();
        var tpl = $compile('<ng-notify-alert-area></ng-notify-alert-area>')(notifyScope);
        
        angular.element(document).find('body').append(tpl);
    }]);
