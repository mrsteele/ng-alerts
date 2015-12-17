'use strict';

var app = angular.module('ngAlerts', ['ngAnimate', 'ui.bootstrap'])

    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
    }]);
