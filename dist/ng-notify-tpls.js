angular.module('ngNotify').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/ng-notify/alert-area.html',
    "<div id=\"ng-notify-alert-area\">\r" +
    "\n" +
    "    <div class=\"alert alert-warning\" ng-repeat=\"notification in notifications\">\r" +
    "\n" +
    "        {{notification.getMsg()}}\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/ng-notify/count.html',
    "<span ng-class=\"{'badge': badge}\">{{count}}</span>"
  );


  $templateCache.put('templates/ng-notify/list.html',
    "<table class=\"table table-hover table-condensed\">\r" +
    "\n" +
    "    <thead>\r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th>Notification</th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "    </thead>\r" +
    "\n" +
    "    <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"notification in notifications\">\r" +
    "\n" +
    "            <td>\r" +
    "\n" +
    "                {{notification.getMsg()}}\r" +
    "\n" +
    "            </td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "    </tbody>\r" +
    "\n" +
    "</table>"
  );

}]);
