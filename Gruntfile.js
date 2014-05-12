module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'public/assets/css/main.css': 'public/assets/scss/*.scss',       // 'destination': 'source'
        }
      }
    },

    watch: {
      sass: {
        files: ['public/assets/scss/partials/*.scss'],
        tasks: ['sass']
      },
      /* watch and see if our javascript files change, or new packages are installed */
      js: {
        files: ['public/assets/js/main.js', 'public/assets/js/partials/*.js', 'public/assets/js/libs/*.js'],
        tasks: ['uglify']
      },
      /* watch our files for change, reload */
      livereload: {
        files: ['*.html', 'public/assets/css/*.css', 'public/assets/images/*', 'public/assets/js/partials/*.js', 'public/assets/libs/*.js'],
        options: {
          livereload: true
        }
      },
    }

  });

  grunt.registerTask('default', 'watch');

}