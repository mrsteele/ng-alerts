angular.module('ngAlerts').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/ng-alerts/count.html',
    "<span ng-class=\"{'badge': badge}\">{{count}}</span>\r" +
    "\n"
  );


  $templateCache.put('templates/ng-alerts/list.html',
    "<div ng-show=\"alerts.length > 0\">\r" +
    "\n" +
    "    <table class=\"table table-hover table-condensed\">\r" +
    "\n" +
    "        <thead>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <th colspan=\"2\">Message</th>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "            <tr ng-repeat=\"alert in alerts\">\r" +
    "\n" +
    "                <td>\r" +
    "\n" +
    "                    {{alert.msg}}\r" +
    "\n" +
    "                </td>\r" +
    "\n" +
    "                <td>\r" +
    "\n" +
    "                    <button ng-click=\"remove(alert.id)\" type=\"button\" class=\"close\" aria-label=\"Close\">\r" +
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
    "<div ng-show=\"alerts.length === 0\">\r" +
    "\n" +
    "    No messages. Better get active!\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/ng-alerts/queue.html',
    "<div id=\"ng-alerts-queue\">\r" +
    "\n" +
    "    <div class=\"alert alert-warning\" ng-repeat=\"alert in alerts\">\r" +
    "\n" +
    "        {{alert.msg}}\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);
