/**
 * Wraps a popover object to the handler (using the angular bootstrap "popover" directive).
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 * @see https://angular-ui.github.io/bootstrap/#/popover
 */
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

                if (!$attrs.uibPopoverTemplate) {
                    $element.attr('uib-popover-template', 'templateUrl');
                }

                if (!$attrs.popoverIsOpen) {
                    $element.attr('popover-is-open', 'isOpen');
                }

                $element.removeAttr('ng-alerts-popover');

                if (!$attrs.popoverTrigger) {
                    $element.attr('popover-trigger', 'outsideClick');
                }

                if (!$attrs.popoverClass) {
                    $element.attr('popover-class', 'ng-alerts-popover-list');
                }

                $scope.templateUrl = 'template/ng-alerts/sub/popover-list.html';
                $scope.emptyText = $attrs.emptyText;

                $compile($element)($scope);

            }
        };
    }
]);
