'use strict';

var app = angular.module('ngNotify', [])
    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        angular.element(document).find('body').append('<ng-notify-alert-area></ng-notify-alert-area>');
    }]);
