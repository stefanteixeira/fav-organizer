module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    copy: {
      project: {
        expand: true,
        cwd: '.',
        src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
        dest: 'dist'
      }
    }

    clean: {
      dist: {
        src: 'dist'
      }
    }
  });

  grunt.registerTask('dist', ['clean', 'copy']);
};
