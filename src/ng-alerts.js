'use strict';

angular.module('ngAlerts', ['ui.bootstrap'])
    
    .provider('ngAlerts', function () {
        
        // defaults
        this.options = {
            emptyListText: 'No messages. Better get active!',
            queueTimeout: 3000,
            queueLocation: 'bottom right'
        };
        
        this.$get = function () {
            return this;
        };
    })

    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
    }]);
