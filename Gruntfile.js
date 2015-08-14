module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-karma');

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

    karma: {
      saucelabs: {
        configFile: 'config/karma.config.js'
      },
      local: {
        configFile: 'config/karma.config.js',
        reporters: ['progress', 'coverage'],
        singleRun: false,
        browsers: ['Chrome']
      }
    },

    mochaTest: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: ['test/api/*.js']
      }
    },

    plato: {
      report: {
        files: {
          'report/plato': ['app/**/*.js', 'public/js/**/*.js']
        }
      }
    }

  });

  grunt.registerTask('default', ['dist', 'minify']);
  grunt.registerTask('dist', ['clean', 'copy']);
  grunt.registerTask('minify', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);
};
