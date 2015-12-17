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
                
                // Ready with 1.0 release
//                if (!$attrs.popoverTrigger) {
//                    $element.attr('popover-trigger', 'outsideClick');
//                }
                
                $scope.templateUrl = 'templates/ng-alerts/sub/popover-list.html';
                $scope.emptyText = $attrs.emptyText;
                
                $compile($element)($scope);
                
            }
        };
    }
]);