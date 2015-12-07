angular.module('ngNotify').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ng-notify/count.html',
    "<span class=\"badge\">{{count}}</span>"
  );


  $templateCache.put('ng-notify/list.html',
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
