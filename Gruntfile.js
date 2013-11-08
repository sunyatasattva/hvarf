module.exports = function(grunt) {

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	clean: {
	  build: ["dist/**"]
	},
	copy: {
		build: {
			files: [{
                    expand: true,
                    dot: true,
                    dest: 'dist/',
                    src: [
                        '**/*.html',
                        '.htaccess',
                        '!node_modules/**'
                    ]
                }]
		}
	},
	/*
	 * Compiles `app.less` into `app.css`.
	 */
	less: {
	  production: {
		 options: {
		   yuicompress: true
		 },
		 files: {
		   "dist/assets/css/app.css": "assets/css/app.less"
		 }
	  }
	},
	/*
	 * Validates javascript.
	 *
	 * Ignores all third-party stuff (not our business), and predefines
	 * the global jQuery.
	 */
	jshint: {
		options: {
			jquery:	  true,
			multistr:  true, // Strings can span multiple lines
			smarttabs: true, // Tabs for indentation, spaces for alignment
			ignores: [
				'assets/js/less.js'
			]
		},
		all: ['assets/js/*.js']
	},
    /*
     * Uglifies all the JS, adding a useful header to each of them.
     */
	uglify: {
	  options: {
		 banner: '\
/*\n\
 * @package   <%= pkg.name %>\n\
 * @version   <%= pkg.version %>.b<%= grunt.template.today("yyyymmdd") %>\n\
 * @author    <%= pkg.author.name %> <<%= pkg.author.email %>>\n\
 */\n'
	  },
	  dist: {
		 files: {
		   'dist/assets/js/app.js': ['assets/js/app.js']
		 }
	  }
	},
	usemin: {
		html: 'dist/*.html'
	}
  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-usemin');

  // Define your tasks here
  grunt.registerTask('build', [
  	'clean',
  	'less',
  	'jshint',
  	'uglify',
  	'copy',
  	'usemin'
  ]);

};