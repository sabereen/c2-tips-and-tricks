"use strict";

const
  gulp = require('gulp'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  // rename = require('gulp-rename'),
  minifyCss = require('gulp-minify-css'),
  jade = require('gulp-jade'),
  connect = require('gulp-connect'),
  merge = require('merge-stream'),
  less = require('gulp-less'),
  include = require('gulp-include-file')
;


gulp.task('build-js', function() {
  return gulp.src('src/js/*.es6')
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(include()).on('err', console.log)
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('build-html', function() {
  return gulp.src(['src/*.jade', 'src/views/*.jade'])
    .pipe(jade({}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('copy-csslibs', function() {

  return gulp.src('src/lib/*.css')
    .pipe(minifyCss())
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('build-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('build-less', function() {
    return gulp.src('src/less/*.less')
      .pipe(less())
      .pipe(minifyCss())
      .pipe(concat('less.css'))
      .pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
});

gulp.task('copy-jslibs', function() {

  let libraries =
    [  'src/lib/*.js'
    //,  'bower_components/nedb/browser-version/out/nedb.min.js'
    ];

  return gulp.src(libraries)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 45501,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(['src/js/*.es6'], ['build-js']);
  gulp.watch(['src/lib/*.js'], ['copy-jslibs']);
  gulp.watch(['src/css/*.css'], ['build-css']);
  gulp.watch(['src/lib/*.css'], ['copy-csslibs']);
  gulp.watch(['src/less/*.less'], ['build-less']);
  gulp.watch(['src/*.jade', 'src/views/*.jade'], ['build-html']);
});

gulp.task('copy', ['copy-jslibs', 'copy-csslibs'], function() {

  var db_copy = gulp.src('src/db/*')
    .pipe(gulp.dest('dist/db'));

  var image_copy = gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images'));

  // return merge(db_copy, image_copy);
});

gulp.task('build', ['copy'], function() {
  gulp.start('build-js', 'build-css', 'build-less', 'build-html');
});

gulp.task('default', ['build', 'connect'], function() {
  gulp.start('watch');
});
