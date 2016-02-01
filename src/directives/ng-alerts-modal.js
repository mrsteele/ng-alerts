/**
 * Wraps a popover object to the handler (using the angular bootstrap "popover" directive).
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 * @see https://angular-ui.github.io/bootstrap/#/popover
 */
angular.module('ngAlerts').directive('ngAlertsModal', [
    'ngAlertsEvent',
    '$uibModal',
    '$compile',
    '$timeout',
    '$sce',
    function (ngAlertsEvent, $uibModal, $compile, $timeout, $sce) {
        'use strict';

        return {
            restrict: 'A',
            terminal: true,
            priority: 1000,
            link: function ($scope, $element, $attrs) {

                $element.attr('ng-click', 'openModal()');
                $element.removeAttr('ng-alerts-modal');

                $scope.emptyText = $attrs.emptyText;

                /**
                 * Opens a modal with the list of alerts created.
                 */
                $scope.openModal = function () {
                    $scope.modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'template/ng-alerts/sub/modal-list.html',
                        size: $attrs.size || 'lg'
                    });

                    $scope.modalInstance.result.then(function () {
                        $scope.modalInstance = null;
                    });
                };

                $compile($element)($scope);

            }
        };
    }
]);
