module.exports = function (grunt) {
    "use strict";

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

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
        clean: ['dist']

    });

    // load plugins

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'less']);

};