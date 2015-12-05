angular.module('ngNotify').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ng-notify/notification-list.html',
    "<ul ng-controller=\"ngNotifyListCtrl\">\r" +
    "\n" +
    "    <li ng-repeat=\"notification in notifications\">\r" +
    "\n" +
    "        {{notification.getMsg()}}\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "</ul>"
  );

}]);
