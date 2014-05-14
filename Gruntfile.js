var utils = require('./build-utils');

module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json'),
        distDir = './dist';

    var version = utils.version.parse(pkg.version),
        versionString = utils.version.getCacheKey(version);

    //noinspection JSValidateTypes
    grunt.util.linefeed = '\n';

    require('load-grunt-tasks')(grunt);

    //noinspection JSUnresolvedFunction
    grunt.initConfig({
        pkg: pkg,

        version : {
            version : version.version,
            versionString : versionString
        },

        distDir: distDir,

        clean: {
            dist: [distDir]
        },

        compress: {
            dist: {
                options: {
                    mode: 'tgz',
                    archive: '<%= distDir %>/<%= pkg.name %>-<%= version.versionString %>.tar.gz'
                },
                files: [
                    {expand: true, cwd: './', dot: true, src: [
                        '**',
                        '!**/.git/**',
                        '!**/node_modules/**'
                    ]}
                ]
            }
        }

    });

    grunt.registerTask('dist', [
        'clean:dist',
        'compress:dist'
    ]);

    grunt.registerTask('default', ['dist']);

};
