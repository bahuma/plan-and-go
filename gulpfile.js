'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var del = require('del');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var swPrecache = require('sw-precache');
var path = require('path');

var packageJson = require('./package.json');

var yeoman = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
};

var paths = {
  scripts: [yeoman.app + '/scripts/**/*.js'],
  styles: [yeoman.app + '/styles/**/*.scss'],
  views: {
    main: yeoman.app + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.sass, {
    outputStyle: 'expanded',
    precision: 10
  })
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

var writeServiceWorkerFile = function (rootDir, handleFetch, callback) {
  var config = {
    cacheId: packageJson.name,
    // dynamicUrlToDependencies: {
    //   'dynamic/page1': [
    //     path.join(rootDir, 'views', 'layout.jade'),
    //     path.join(rootDir, 'views', 'page1.jade')
    //   ],
    //   'dynamic/page2': [
    //     path.join(rootDir, 'views', 'layout.jade'),
    //     path.join(rootDir, 'views', 'page2.jade')
    //   ]
    // },
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    logger: $.util.log,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /runtime-caching/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 1,
          name: 'runtime-cache'
        }
      }
    }],
    staticFileGlobs: [
      rootDir + '/**/*'
    ],
    stripPrefix: rootDir + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
};

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function () {
  return del('.tmp');
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
    $.connect.server({
        root: [yeoman.app, '.tmp'],
        livereload: true,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000
    });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['bower'],
    ['start:client'],
    'watch', cb);
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 9000
  });
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: yeoman.app + '/bower_components',
      ignorePath: '..'
    }))
    .pipe(gulp.dest(yeoman.app));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function () {
  return del(yeoman.dist);
});

gulp.task('client:build', ['html', 'styles'], function () {
  var jsFilter = $.filter('**/*.js', {restore: true});
  var cssFilter = $.filter('**/*.css', {restore: true});

  return gulp.src(paths.views.main)
    .pipe($.useref({searchPath: [yeoman.app, '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    // .pipe($.uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.cleanCss())
    .pipe(cssFilter.restore)
    .pipe($.rev())
    .pipe($.revReplace())
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('html', function () {
  return gulp.src(yeoman.app + '/views/**/*')
    .pipe(gulp.dest(yeoman.dist + '/views'));
});

gulp.task('images', function () {
  return gulp.src(yeoman.app + '/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('copy:extras', function () {
  return gulp.src([
    yeoman.app + '/*/.*',
    yeoman.app + '/manifest.json',
    yeoman.app + '/favicon.ico'
  ], { dot: true })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function () {
  return gulp.src([
    yeoman.app + '/fonts/**/*'
  ]).pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('renamedistindex', function() {
  return gulp.src(yeoman.dist + '/index*.html')
    .pipe($.rename('index.html'))
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('deletedistindex', function() {
  return del(yeoman.dist + '/index-*.html');
});

gulp.task('generatedistserviceworker', function(callback) {
  writeServiceWorkerFile('dist', true, callback);
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['images', 'copy:extras', 'copy:fonts', 'client:build'], ['renamedistindex', 'deletedistindex']);
});

gulp.task('default', ['build']);
