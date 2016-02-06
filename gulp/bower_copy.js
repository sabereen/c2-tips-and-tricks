"use strict";

const
    gulp   = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat')
	//rtlcss = require('gulp-rtlcss')
    ;

const
    root = process.cwd(),
    config = require(root + '/config.js')
    ;

function bower_copy(min) {

    const
        packages = min ? config.packages : config.full_packages,
        css_packages = min ? config.css_packages : config.full_css_packages,
        dist = min ? config.dist : config.src;

    const angular_addons = [
        'angular-ui-router',
        'angular-animate',
        'angular-aria',
        'angular-messages',
        'angular-material'
    ].map(x => packages[x]);

    const css =
        [ 'angular-material'
        //, 'angular-material-layouts'
    ].map(x => css_packages[x]);

    var angular = () =>
        gulp.src(packages["angular"])
            .pipe(rename({suffix: min ? '' : '.min'}))
            .pipe(gulp.dest(`${dist}/app/`));

    var angular_modules = () =>
        gulp.src(angular_addons)
            .pipe(concat('modules.js'))
            .pipe(gulp.dest(`${dist}/app/`));

    var styles = () =>
        gulp.src(css)
            .pipe(concat('styles.css'))
			//.pipe(rtlcss())
            .pipe(gulp.dest(`${dist}/app/`));

    var nedb = () =>
        gulp.src(packages["nedb"])
            .pipe(rename('nedb.js'))
            .pipe(gulp.dest(`${dist}/app/libraries/`))

    return {
        angular,
        angular_modules,
        nedb,
        styles
    }
}
module.exports = bower_copy;