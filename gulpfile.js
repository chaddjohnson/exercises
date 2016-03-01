'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var path = require('path');
var rimraf = require('rimraf');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var atImport = require('postcss-import');
var cssnano = require('cssnano');
var cssnext = require('postcss-cssnext');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var stringify = require('stringify');
var uglify = require('gulp-uglify');
var md5Plus = require('gulp-md5-plus');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

// Default the environment to "local".
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var isReleaseBuild = ['qa', 'staging', 'production'].indexOf(process.env.NODE_ENV) > -1;

// Paths used in the build process.
var paths = {
    dist: 'dist',
    vendor: [
        'jquery',
        'handlebars',
        'backbone',
        'bootstrap'
    ],
    app: 'src/**/*.js',
    css: ['src/vendor.css', 'src/**/*.css'],
    html: 'src/index.html',
    templates: 'src/**/*.html',
    assets: {
        fonts: ['node_modules/bootstrap/fonts/*']
    },
    bin: ['app.css', 'vendor.js', 'app.js']
};

function handleError(error) {
    gutil.log(gutil.colors.red('ERROR: ') + error.message);
    gutil.beep();
    this.emit('end');
}

// Cleans the dist directory.
gulp.task('clean', function(done) {
    rimraf(paths.dist, done);
});

// Runs jshint against the code.
gulp.task('jshint', function() {
    // This will use settings in the .jshintrc file.
    return gulp.src(paths.app)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Bundles vendor dependencies.
gulp.task('bundle:vendor', function() {
    var bundler = browserify('./src/vendor.js');

    // Require all vendor libraries in the bundle.
    paths.vendor.forEach(function(vendor) {
        bundler.require(vendor);
    });
    
    return bundler
        .bundle().on('error', handleError)
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(gulpif(isReleaseBuild, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});

// Bundles the application.
gulp.task('bundle:app', function() {
    var index = 0;

    var bundler = browserify('./src/app.js');

    // Externalize all vendor libraries in the bundle.
    paths.vendor.forEach(function(vendor) {
        bundler.external(vendor);
    });

    return bundler
        .transform('require-globify')
        .transform(stringify())
        .bundle().on('error', handleError)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(gulpif(isReleaseBuild, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());

    // TODO Exclude vendor packages from bundle.
});

// Creates all bundles.
gulp.task('bundle', ['bundle:vendor', 'bundle:app']);

// Builds CSS.
gulp.task('css', function() {
    // Source: https://gist.github.com/RickCogley/cf7e5174652e73cf1059
    return gulp.src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(concat('app.css')).on('error', handleError)
        .pipe(postcss([
            atImport(),
            cssnext({
                autoprefixer: {
                    browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9']
                }
            }),
            cssnano()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});

gulp.task('copy:html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist));
});

// Processes entry point HTML file.
gulp.task('html', ['copy:html'], function() {
    return gulp.src(paths.bin, {cwd: paths.dist})
        .pipe(gulpif(isReleaseBuild, md5Plus(32, path.join(paths.dist, 'index.html'))))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});

gulp.task('assets:fonts', function() {
    return gulp.src(paths.assets.fonts)
        .pipe(gulp.dest(path.join(paths.dist, 'fonts')));
});

gulp.task('assets', ['assets:fonts']);

// Runs Express service.
gulp.task('server', function() {
    nodemon({
        script: './server/app.js',
        ext: 'js',
        watch: ['server/**/*.js'],
        env: {'NODE_ENV': process.env.NODE_ENV}
    });
});

// Watches for changes and acts when they occur.
gulp.task('watch', function() {
    // This is set to use the default livereload port, but it can be changed if
    // this ever conflicts with another app.
    livereload.listen({port: 35729, quiet: true});

    watch('src/vendor.js', function() {
        gulp.start('bundle:vendor');
    });

    // Watch for changes to application files.
    watch([paths.app, 'src/app.js', paths.templates], function() {
        runSequence('jshint', 'bundle:app');
    });

    // Watch for changes to main HTML file.
    watch(paths.html, function() {
        gulp.start('html');
    });

    // Watch for changes to CSS files.
    watch(paths.css, function() {
        gulp.start('css');
    });

    // Watch for changes to asset files.
    watch(paths.assets.fonts, function() {
        gulp.start('assets:fonts');
    });
});

// Builds the app.
gulp.task('build', function(done) {
    runSequence('jshint', 'clean', 'bundle', 'css', 'html', 'assets', done);
});

// Default task when running "gulp".
gulp.task('default', function(done) {
    runSequence('build', 'server', 'watch', done);
});
