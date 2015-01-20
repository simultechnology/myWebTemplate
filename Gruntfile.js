module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src: 'src',
            dest: 'dest'
        },
        jshint: {
            beforeconcat: ['<%= dirs.src %>/js/*.js'],
            afterconcat: ['<%= concat.js.dest %>']
        },
        concat: {
            options: {
                banner: '/* header */'
            },
            js: {
                src: ['<%= dirs.src %>/js/*.js'],
                dest: '<%= dirs.dest %>/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true
            },
            dest: {
                files : {
                    '<%= dirs.dest %>/js/<%= pkg.name %>.min.js': '<%= concat.js.dest %>'
                }
            }
        },
        connect: {
            livereload: {
                options: {
                    open: true,
                    port: 1234,
                    livereload: 35729,
                    hostname: 'localhost',
                    base: [ '<%= dirs.src %>/html' ]
                }
            }
        },
        watch: {
            files: ['<%= dirs.src %>/js/*.js'],
            tasks: ['build'],
            reload: {
                options: {
                    livereload: '<%= connect.livereload %>'
                },
                files: [
                    '<%= dirs.src %>/**/*.js',
                    '<%= dirs.src %>/**/*.css',
                    '<%= dirs.src %>/**/*.html'
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', 'Build start!', [
        'jshint:beforeconcat',
        'concat',
        'jshint:afterconcat',
        'uglify',
        'connect',
        'watch'
    ]);
};