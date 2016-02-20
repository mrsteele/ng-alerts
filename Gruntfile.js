var path = require('path');

module.exports = function (grunt) {
    "use strict";

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';
    
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',


        // concatinates libraries and move to dist
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
            },
            dist: {
                src: ['src/ng-alerts.js', 'src/**/*.js'],
                dest: 'dist/ng-alerts.js'
            }
        },

        // minifies all source code
        uglify: {
            dev: {
                option: {
                    banner: '<%= banner %>',
                    compress: true,
                    sourceMap: true
                },
                files: {
                    'dist/ng-alerts.min.js': ['dist/ng-alerts.js']
                }
            }
        },
        
        // compiles and minifies styles
        less: {
            dist: {
                files: {
                    'dist/ng-alerts.css': 'src/ng-alerts.less'
                }
            },
            min: {
                options: {
                    compress: true
                },
                files: {
                    'dist/ng-alerts.min.css': 'src/ng-alerts.less'
                }
            }
        },

        // cleans directories
        clean: ['dist'],
        
        // preserve templates
        ngtemplates: {
            ngAlerts: {
                src: '**/*.html',
                dest: 'dist/ng-alerts.js',
                cwd: 'src/tpls/',
                options:  {
                    url: function (url) {
                        return 'template/ng-alerts/' + url;
                    },
                    append: true
                }
            }
        },
        
        
        ///////////
        // DEBUG //
        ///////////
        
        express: {
            all: {
                options: {
                    port: 3000,
                    hostname: '0.0.0.0',
                    livereload: true,
                    bases: [path.resolve(__dirname)]
                }
            }
        },
        
        // watch during development
        watch: {
            options: {
                livereload: true
            },
            all: {
                files: 'src/**/*.*',
                tasks: ['default']
            }
        },
        
        open: {
            all: {
                path: 'http://localhost:3000/test/index.html'
            }
        }

    });

    grunt.registerTask('default', [
        'clean',
        'concat',
        'ngtemplates',
        'uglify',
        'less'
    ]);
    
    grunt.registerTask('test', [
        'express',
        'open',
        'watch'
    ]);

};