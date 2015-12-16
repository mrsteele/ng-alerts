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

                var position = $attrs.position || 'top';
                
                //$element.attr('uib-popover-html', 'trustedAsHtml');
                
                $element.attr('uib-popover-template', 'templates/ng-alerts/sub/popover-list.html');
                $element.attr('popover-placement', position);
                $element.removeAttr('ng-alerts-popover');
                
//                $scope.updateContent = function () {
//                    var $el = $compile('<ng-alerts-list></ng-alerts-list>')($scope);
//                    $timeout(function () {
//                        var content = $el.html();
//                        console.dir($el);
//                        console.dir(content);
//                        $scope.trustedAsHtml = $sce.trustAsHtml(content);
//                    });
//                }
//                
//                $scope.$on(ngAlertsEvent.event('change'), $scope.updateContent);
//                
//                $scope.updateContent();
                
                $compile($element)($scope);
                
                
//                var position = $attrs.position || 'top',
//                    emptyText = ($attrs.emptyText) ? ' empty-text="' + $attrs.emptyText + '"' : '',
//                    $el = $compile('<div class="ng-alerts-popover popover fade ' + position + ' in" role="tooltip" style="display: block;"><div class="arrow" style="left: 50%;"></div><div class="popover-content"><ng-alerts-list' + emptyText + '></ng-alerts-list></div></div>')($scope),
//                    body = angular.element(document).find('body');
//                
//                function hidePopover(e) {
//                    $el.detach();
//                }
//                
//                function positionPopover() {
//                    var rect = $element[0].getBoundingClientRect(),
//                        top,
//                        left;
//                    
//                    if (position === 'top' || position === 'bottom') {
//                        top = (position === 'bottom') ? rect.bottom : rect.top + $element[0].offsetHeight;
//                        left = rect.left + ($element[0].offsetWidth / 2) - ($el[0].offsetWidth / 2);
//                    } else {
//                        top = rect.top + ($element[0].offsetHeight / 2) - ($el[0].offsetHeight / 2);
//                        left = (position === 'left') ? rect.left - $el[0].offsetWidth : rect.right + $el[0].offsetWidth;
//                    }
//
//                    $el.css({
//                        top: top + 'px',
//                        left: left + 'px'
//                    });
//                }
//
//                function interrupt(e) {
//                    e.stopPropagation();
//                    positionPopover();
//                }
//
//                function click(e) {
//                    interrupt(e);
//                    hidePopover(e);
//
//                    body.append($el);
//                    
//                    positionPopover();
//                }
//
//                function destroy() {
//                    $element.off('click', click);
//                    body.off('click', hidePopover);
//                    $el.off('click', interrupt);
//                    
//                    $el.remove();
//                }
//
//                $element.on('click', click);
//                body.on('click', hidePopover);
//                $el.on('click', interrupt);
//
//                $scope.$on('$destroy', destroy);

            }
        };
    }
]);