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
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',


        // concatinates libraries and move to dist
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
            },
            dist: {
                src: 'src/ng-notify.js',
                dest: 'dist/ng-notify.js'
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
                    'dist/ng-notify.min.js': 'src/ng-notify.js'
                }
            }
        },
        
        // compiles and minifies styles
        less: {
            dist: {
                files: {
                    'dist/ng-notify.css': 'src/ng-notify.less'
                }
            },
            min: {
                options: {
                    compress: true
                },
                files: {
                    'dist/ng-notify.min.css': 'src/ng-notify.less'
                }
            }
        },

        // cleans directories
        clean: ['dist'],
        
        // preserve templates
        ngtemplates: {
            ngNotify: {
                src: '**.html',
                dest: 'dist/ng-notify-tpls.js',
                cwd: 'src/tpls/',
                options:  {
                    url: function (url) {
                        return 'ng-notify/' + url;
                    }
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
        'uglify',
        'ngtemplates',
        'less'
    ]);
    
    grunt.registerTask('test', [
        'express',
        'open',
        'watch'
    ]);

};