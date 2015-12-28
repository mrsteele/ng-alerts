'use strict';

angular.module('ngAlerts', ['ui.bootstrap'])
    
    /**
     * Use this provider to configure defaults.
     * @param {Object} options - The options to configure.
     * @param {String} options.emptyListText - The default empty list text.
     * @param {Number} options.queueTimeout - The miliseconds till an alert timesout.
     * @param {String} options.queueLocation - The location of the queue (i.e. "top left" or "bottom right", etc...).
     * @returns {Object} The default options, specifically an object with an "options" parameter.
     */
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

    /**
     * Called when this module runs. Specifically it adds the queue object to the stage.
     */
    .run(function () {
        angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
    });
