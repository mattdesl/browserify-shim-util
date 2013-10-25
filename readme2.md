This is a small utility for a project that needs to externalize a lot of 3rd party libraries. See here:
http://benclinkinbeard.com/blog/2013/08/external-bundles-for-faster-browserify-builds/

See here for an example:

```javascript
var Libs = require('browserify-shim-util');

//We set up our shims here, so we can use require(...) on them in our code
Libs.addShims([
	{ 
		alias: 	 'threejs', 
		path: 	 'bower_components/threejs/build/three.js', 
		exports: 'THREE'
	},
	{ 
		alias:   'jquery', 
		path:    'bower_components/jquery/jquery.js', 
		exports: '$'
	},
	{ //this is how we might include a jQuery plugin to our libs build.
		alias:   'jquery.transit', 
		path:    'bower_components/jquery.transit/jquery.transit.js', 
		exports: null,
		depends: { jquery: '$' }
	},
	{ 
		alias: 	 'raf.js',
		path:    'bower_components/raf.js/raf.js'
	}
]);

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		distdir: 'build', 
		srcdir: 'lib',

		browserify: {
			// Externalize 3rd party libraries for faster builds
			libs: {
				options: {
					shim: Libs.shims, 
					//Include source maps for libs during development...
					debug: true
				},
				src: Libs.paths,
				dest: '<%= distdir %>/libs.js'
			},

			//Here is where we bundle our app...
			bundle: {
				src: ['<%= srcdir %>/index.js'],
				dest: '<%= distdir %>/bundle.js',

				options: {
					alias: Libs.aliases,
					external: Libs.externals, 
					debug: true
				}
			}
		}, 
	
	.....
}

```