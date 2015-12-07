angular.module('ngNotify').directive('ngNotifyPopover', ['$compile', '$timeout', function ($compile, $timeout) {
    'use strict';
    
    return {
        scope: {
            position: '@'
        },
        link: function ($scope, $element) {
            
            var position = $scope.position || 'top',
                $el = $compile('<div class="popover fade ' + position + ' in" role="tooltip" id="popover677443" style="top: 25477px; left: 266px; display: block;"><div class="arrow" style="left: 50%;"></div><div class="popover-content"><ng-notify-list></ng-notify-list></div></div>')($scope),
                body = angular.element(document).find('body');
            
            function hidePopover() {
                $el.remove();
                body.off('click', hidePopover);
            }
            
            function click() {
                body.off('click', hidePopover);
                var rect = $element[0].getBoundingClientRect(),
                    top,
                    left;
                
                body.append($el);
                    
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
                
                // clicking anywhere else deletes the $el
                $timeout(function () {
                    body.on('click', hidePopover);
                });
            }
            
            function destroy() {
                $element.off('click', click);
                body.off('click', hidePopover);
            }
            
            $element.on('click', click);
            
            $scope.$on('$destroy', destroy);
            
        }
    };
}]);