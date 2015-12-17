'use strict';

var app = angular.module('ngAlerts', ['ui.bootstrap'])

    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
    }]);
