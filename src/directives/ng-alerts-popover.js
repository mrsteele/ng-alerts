angular.module('ngAlerts').directive('ngAlertsPopover', [
    'ngAlertsEvent',
    '$compile',
    '$timeout',
    '$sce',
    function (ngAlertsEvent, $compile, $timeout, $sce) {
        'use strict';
        
        return {
            restrict: 'A',
            terminal: true,
            priority: 1000,
            link: function ($scope, $element, $attrs) {
                
                $element.attr('uib-popover-template', 'templateUrl');
                $element.removeAttr('ng-alerts-popover');
                
                $scope.templateUrl = 'templates/ng-alerts/sub/popover-list.html';
                
                $compile($element)($scope);
                
            }
        };
    }
]);