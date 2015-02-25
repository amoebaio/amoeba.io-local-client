module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
            },
            build: {
                src: 'build/amoeba.io-local-client.js',
                dest: 'build/amoeba.io-local-client.min.js'
            }
        },
        browserify: {
            dist: {
                files: {
                    'build/amoeba.io-local-client.js': ['lib/amoeba-local-client.js'],
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['browserify', 'uglify']);

};
