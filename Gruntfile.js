'use strict';
module.exports = function(grunt) {
    pkg: grunt.file.readJSON('package.json'),
        grunt.initConfig({
            less: {
                development: {
                    options: {
                        cleancss: false,
                        syncImport: true,
                        sourceMap: true,
                        strictImports: true,
                        sourceMapFilename: './css/base.css.map',
                        sourceMapURL: './base.css.map'
                    },
                    files: {
                        './css/base.css': './less/base.less'
                    }
                }
            },
            watch: {
                styles: {
                    // Which files to watch (all .less files recursively in the less directory)
                    files: ['source/less/**/*.less'],
                    tasks: ['less']
                },
                js: {
                    // Which files to watch (all .less files recursively in the less directory)
                    files: ['source/javascript/**/*.js'],
                    tasks: ['uglify']
                }
            },
            uglify: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'all',
                    beautify: false,
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                general: {
                    files: {
                        './javascript/javascript.js': [
                            'javascript/base.js'
                        ]
                    }
                }
            }
        });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'uglify']);
};