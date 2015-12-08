angular.module('ngNotify').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/ng-notify/alert-area.html',
    "<div id=\"ng-notify-alert-area\">\r" +
    "\n" +
    "    <div class=\"alert alert-warning\" ng-repeat=\"notification in notifications\">\r" +
    "\n" +
    "        {{notification.msg}}\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/ng-notify/count.html',
    "<span ng-class=\"{'badge': badge}\">{{count}}</span>\r" +
    "\n"
  );


  $templateCache.put('templates/ng-notify/list.html',
    "<div ng-show=\"notifications.length > 0\">\r" +
    "\n" +
    "    <table class=\"table table-hover table-condensed\">\r" +
    "\n" +
    "        <thead>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <th colspan=\"2\">Notification</th>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "            <tr ng-repeat=\"notification in notifications\">\r" +
    "\n" +
    "                <td>\r" +
    "\n" +
    "                    {{notification.msg}}\r" +
    "\n" +
    "                </td>\r" +
    "\n" +
    "                <td>\r" +
    "\n" +
    "                    <button ng-click=\"remove(notification.id)\" type=\"button\" class=\"close\" aria-label=\"Close\">\r" +
    "\n" +
    "                        <span aria-hidden=\"true\">&times;</span>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                </td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-show=\"notifications.length === 0\">\r" +
    "\n" +
    "    No notifications. Better get active!\r" +
    "\n" +
    "</div>"
  );

}]);
