/**
* Plugins
*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var path = require('path');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');

// Default NODE_ENV to "development".
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var paths = {
	build: 'dist',
	src: {
		css: [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'src/css/app.css'
		],
		vendor: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/handlebars/handlebars.js',
            'bower_components/bootstrap/dist/js/bootstrap.js'
		],
		app: [
            'src/app/**/*.js' // Shortcut for referencing all .js files in src/app recursively
		],
		html: ['src/index.html']
	}
};

function handleError(error) {
	gutil.log(gutil.colors.red('ERROR: ') + error.message);
	gutil.beep();
	this.emit('end');
}

gulp.task('clean', function() {
    return gulp.src(paths.build)
        .pipe(clean());
});

// Copies the main HTML file to the build directory.
gulp.task('copy:html', function() {
    return gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.build));
});

gulp.task('copy:css', function() {
	return gulp.src(paths.src.css)
	    .pipe(concat('app.css')).on('error', handleError)
	    .pipe(gulp.dest(paths.build));
});

// TEMPORARY This is temporary until we start using Backbone
gulp.task('copy:templates', function() {
    return gulp.src('src/app/**/*.hbs', {base: './src'})
        .pipe(gulp.dest(paths.build));
});

// Shortcut to run all copying tasks in one shot.
gulp.task('copy', ['copy:html', 'copy:css', 'copy:templates']);

// Builds all third-party JS libraries into one file.
gulp.task('concat:vendor', function() {
	return gulp.src(paths.src.vendor)
	    .pipe(concat('vendor.js')).on('error', handleError)
	    .pipe(gulp.dest(paths.build));
});

// Builds all app-specific JS files into one file.
gulp.task('concat:app', function() {
	// return gulp.src(paths.src.app)
	//     .pipe(concat('app.js')).on('error', handleError)
	//     .pipe(gulp.dest(paths.build));

	// TEMPORARY: For now, we will just copy files. Later we will uncomment what's above
	// and use that instead.
    return gulp.src(paths.src.app, {base: './src'})
        .pipe(gulp.dest(paths.build));
});

// Shortcut to run all concatenation tasks in one shot.
gulp.task('concat', ['concat:vendor', 'concat:app']);

// Quality checks application source files.
gulp.task('jshint', function() {
	return gulp.src(paths.src.app)
	    .pipe(jshint({
	    	curly: false,
	    	freeze: true,
	    	immed: true,
	    	latedef: 'nofunc',
	    	newcap: true,
	    	noarg: true,
	    	nonbsp: true,
	    	quotmark: 'single',
	    	undef: true,
	    	unused: 'vars',
	    	sub: true,
	    	evil: true
	    }))
	    .pipe(jshint.reporter('default'));
});

// Runs the server
gulp.task('server', function() {
	nodemon({
		script: './server/app.js',
		ext: 'js',
		env: {'NODE_ENV': process.env.NODE_ENV || 'development'}
	}).on('restart', function() {
		console.log('Server restarted.');
	});
});

// Watches for changes to files and rebuilds when changes occur.
gulp.task('watch', function() {
	// Watch for changes to vendor files.
	gulp.watch(paths.src.vendor, ['concat:vendor']);

	// Watch for changes to application files.
	gulp.watch(paths.src.app, function() {
		runSequence('jshint', 'concat:app');
	});

	// Watch for changes to the HTML file.
	gulp.watch(paths.src.html, ['copy:html']);

	// Reload the browser whenever anything is rebuilt.
	gulp.watch('dist/**/*', function() {
		setTimeout(livereload.changed, 250);
	});
});

// Shortcut to run several tasks when building the application.
gulp.task('build', function(done) {
	runSequence('jshint', 'clean', 'copy', 'concat', done);
});

// The default task that will run when "gulp" is run.
// Runs the build and the Express server, and starts watching of application files for changes.
gulp.task('default', function(done) {
	runSequence('build', 'server', 'watch', done);
});
