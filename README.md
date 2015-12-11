# ng-alerts

[![dependency Status](https://david-dm.org/mrsteele/ng-alerts.svg)](https://david-dm.org/angular-ui/bootstrap#info=dependencies)
[![devDependency Status](https://david-dm.org/mrsteele/ng-alerts/dev-status.svg)](https://david-dm.org/angular-ui/bootstrap#info=devDependencies)

An angular extension to manager front-end notifications and alerts.

## About

LIVE DEMO: http://mrsteele.github.io/ng-alerts/

I made this plugin in an attempt to manage any and all user-faces notifications and alerts. I wanted it clean, extensible, and scalable.

## Prerequisites

Only a few prerequisites to use this plugin (a prereq's prereqs listed as well).

* AngularJS
* Angular-UI Bootstrap
    * Bootstrap

## Installation

### Node

```
npn install ng-alerts --save
```

### Bower

```
bower install ng-alerts --save
```

ng-alerts is made to be flexible for the benefit of the developer. Mix and match whatever systems you want to achieve whatever you would like!.

If you want to see a quick example, just open */test/index.html* and that will let you know what to expect, otherwise read the information below.

First, you must include the module name in your dependencies list.

```javascript
var testApp = angular.module('testApp', [
    'ngAlerts'
]);
```

ng-alerts will now be installed for you to use throughout your application. It is recommended you interface through **ngAlertsMngr** to add your alerts.
```javascript
testApp.controller('TestCtrl', function ($scope, ngAlertsMngr) {
    $scope.createAlert = function () {
        ngAlertsMngr.add('testing');
    };
});
```

Using the **add** function will add a notification and update all directives throughout your application.

## Directives

### ng-alerts-count

Use this to display the current count of notifications.

* **badge** - Set this attribute to "true" if you want it to take on the appearance of a bade.
* **hide-empty** - Set this to "true" if you want to completely remove the text if you have "zero" alerts.

#### Example
```html
<ng-alerts-count badge="true" hide-empty="true"></ng-alerts-count>
```

### ng-alerts-list

Displays a list of alerts, with the ability to remove them.

#### Example
```html
<ng-alerts-list></ng-alerts-list>
```

### ng-alerts-popover

Attaches to an element (button, a, etc...) and creates a click handler for displaying ```ng-alerts-list``` in a popover.

* **position** - Set this attribute to define where you want the popover to draw. Accepted values are 'top', 'bottom', 'left' and 'right'. Defaults to 'top'.

#### Example
```html
<button ng-alerts-popover position="left"></button>
```

## Can I contribute?

YES! Pull requests welcome!
