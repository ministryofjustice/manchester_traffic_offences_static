module.exports = function(grunt) {

  'use strict';

  /**
   * Default source paths
   * @type {Object}
   */
  var srcPaths = {
    styles: {
      // Dependencies should be loaded in main stylesheet
      // using @import directives
      app: 'assets/stylesheets/'
    },
    scripts: {
      vendor: 'assets/javascripts/vendor/',
      govuk: 'node_modules/govuk_frontend_toolkit/javascripts/',
      plugins: 'assets/javascripts/plugins/',
      app: 'assets/javascripts/'
    }
  };

  /**
   * Default destination paths
   * @type {Object}
   */
  var destPaths = {
    css: 'static/assets/stylesheets/',
    js: 'static/assets/javascripts/'
  };

  /**
   * Grunt tasks
   * @type {Object}
   */
  grunt.initConfig({
    sass: {
      src: [srcPaths.styles.app + 'app.scss'],
      dest: destPaths.css + 'app.css'
    },
    jshint: {
      files: [
        'Gruntfile.js',
        srcPaths.scripts.plugins + '**/*.js',
        srcPaths.scripts.app + 'app.js'
      ],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    concat: {
      src: [
        srcPaths.scripts.vendor + '**/*.js',
        srcPaths.scripts.govuk + '**/*.js',
        srcPaths.scripts.plugins + '**/*.js',
        srcPaths.scripts.app + 'app.js'
      ],
      dest: destPaths.js + 'app.js',
      options: {
        separator: ';',
      }
    },
    imagemin: {
      files: {
        expand: true,
        cwd: 'assets/images/',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'static/assets/images/'
      }
    },
    watch: {
      sass: {
        files: [srcPaths.styles.app],
        tasks: ['sass']
      },
      jshint: {
        files: [
          'gruntfile.js',
          srcPaths.scripts.plugins + '**/*.js',
          srcPaths.scripts.app + 'app.js'
        ],
        tasks: ['jshint']
      },
      js: {
        files: [
          srcPaths.scripts.vendor + '**/*.js',
          srcPaths.scripts.govuk + '**/*.js',
          srcPaths.scripts.plugins + '**/*.js',
          srcPaths.scripts.app + 'app.js'
        ],
        tasks: ['concat']
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');



  // Wrapper tasks
  grunt.registerTask('build', 'Lint, test and compile prod-ready assets', ['sass', 'jshint', 'concat', 'newer:imagemin']);
  
  grunt.registerTask('default', ['build']);

};