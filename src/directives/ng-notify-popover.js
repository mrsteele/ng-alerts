angular.module('ngNotify').directive('ngNotifyPopover', [
    '$compile',
    '$timeout',
    function ($compile, $timeout) {
        'use strict';

        return {
            link: function ($scope, $element, $attrs) {

                var position = $attrs.position || 'top',
                    $el = $compile('<div class="ng-notify-popover popover fade ' + position + ' in" role="tooltip" id="popover677443" style="top: 25477px; left: 266px; display: block;"><div class="arrow" style="left: 50%;"></div><div class="popover-content"><ng-notify-list></ng-notify-list></div></div>')($scope),
                    body = angular.element(document).find('body');
                
                function hidePopover(e) {
                    $el.detach();
                }
                
                function positionPopover() {
                    var rect = $element[0].getBoundingClientRect(),
                        top,
                        left;
                    
                    if (position === 'top' || position === 'bottom') {
                        top = (position === 'bottom') ? rect.bottom : rect.top + $element[0].offsetHeight;
                        left = rect.left + ($element[0].offsetWidth / 2) - ($el[0].offsetWidth / 2);
                    } else {
                        top = rect.top + ($element[0].offsetHeight / 2) - ($el[0].offsetHeight / 2);
                        left = (position === 'left') ? rect.left - $el[0].offsetWidth : rect.right + $el[0].offsetWidth;
                    }

                    $el.css({
                        top: top,
                        left: left
                    });
                }

                function interrupt(e) {
                    e.stopPropagation();
                    positionPopover();
                }

                function click(e) {
                    interrupt(e);
                    hidePopover(e);

                    body.append($el);
                    
                    positionPopover();
                }

                function destroy() {
                    $element.off('click', click);
                    body.off('click', hidePopover);
                    $el.off('click', interrupt);
                    
                    $el.remove();
                }

                $element.on('click', click);
                body.on('click', hidePopover);
                $el.on('click', interrupt);

                $scope.$on('$destroy', destroy);

            }
        };
    }
]);