module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    copy: {
      project: {
        expand: true,
        cwd: '.',
        src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
        dest: 'dist'
      }
    },

    clean: {
      dist: {
        src: 'dist'
      }
    },

    usemin : {
      html: 'dist/app/views/**/*.ejs'
    },

    useminPrepare: {
      options: {
        root: 'dist/public',
        dest: 'dist/public'
      },
      html: 'dist/app/views/**/*.ejs'
    },

    ngAnnotate: {
      scripts: {
        expand: true,
        src: ['dist/public/js/**/*.js']
      }
    },

    mochaTest: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: ['test/api/*.js']
      }
    }

  });

  grunt.registerTask('default', ['dist', 'minify']);
  grunt.registerTask('dist', ['clean', 'copy']);
  grunt.registerTask('minify', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);
};
