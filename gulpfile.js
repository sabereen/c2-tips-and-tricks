"use strict";

const
    gulp    = require('gulp'),
    babel   = require('gulp-babel'),
    concat  = require('gulp-concat'),
    clean   = require('gulp-clean'),
    uglify  = require('gulp-uglify'),
    chalk   = require('chalk'),
    ngmin   = require('gulp-ngmin'),
    htmlmin = require('gulp-htmlmin'),
    useref  = require('gulp-useref'),    // Replace <script> and <link> tags for concating
    cssmin  = require('gulp-minify-css'),
    gulpif  = require('gulp-if'),
    connect = require('gulp-connect'),
    replace = require('gulp-replace'),
    //imgmin  = require('gulp-imagemin'),
    cmd     = require('child_process')
    ;

const
    config = require('./config.js'),
    src = config.src,
    dist = config.dist,
    source_gulp = require('./gulp/source_gulp'),
	genJsonDb = require('./gulp/generate-json-database'),
    bower_copy = require('./gulp/bower_copy')(true)  // minify: true
    ;

gulp.task('clean', function () {
    return gulp.src([`${dist}/*`, `!${dist}/.git`], {read: false})
        .pipe(clean());
});

gulp.task('copy', () => {
    bower_copy.angular();
    bower_copy.angular_modules();
    bower_copy.styles();
    bower_copy.nedb();

    copy(`${src}/app/assets/**/*.*`, `${dist}/app/assets`);
    copy(`${src}/windows/*/images/*.*`, `${dist}/windows/`);
    copy(`${src}/windows/*/resources/*.*`, `${dist}/windows/`);

    function copy(src, dist) {
        gulp.src(src).pipe(gulp.dest(dist));
    }
});

gulp.task('babel', function () {

    let babel_handled = babel({ presets: ["es2015"] })
        .on('error', function (err) {
            console.log(chalk.red("Babel Error in:"));
            console.log(err.fileName, chalk.yellow('in line') , err.lineNumber);
            console.log(chalk.cyan.italic('Message:'), err.message);
            this.end();
        });

    let views = gulp.src([`${src}/windows/**/*.js`])
        .pipe(babel_handled)
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(gulp.dest(`${dist}/windows`))
        .pipe(connect.reload())
        ;

    //let libs = gulp.src(`${src}/app/libraries/*.js`)
    //    .pipe(concat('app/general.js'))
    //    .pipe(gulp.dest(dist));


});

gulp.task('templates', () => {

    let babel_handled = babel({ presets: ["es2015"] })
        .on('error', function (err) {
            console.log(chalk.red("Babel Error in:"));
            console.log(err.fileName, chalk.yellow('in line') , err.lineNumber);
            console.log(chalk.cyan.italic('Message:'), err.message);
            this.end();
        });

    let htmlminify = () => htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
    });

    let js = pipe => gulpif('*.js', pipe);

    gulp.src(`${src}/windows/**/*.html`)
        .pipe(htmlminify())
        .pipe(gulp.dest(`${dist}/windows`))
        .pipe(connect.reload());

    let index = gulp.src(`${src}/index.html`)
        .pipe(useref())
        //.pipe(replace('<base href="/">', '<base href="/c2-tips-and-tricks/">'))
        .pipe(gulpif('*.html', htmlminify()))
        .pipe(js(babel_handled))
        .pipe(js(ngmin()))
        .pipe(js(uglify()))
            .on('error', e => console.log(chalk.yellow('uglify error in line: ', e.fileName, e.line)))
        .pipe(gulpif('fonts.css', replace('../../', '/c2-tips-and-tricks/')))
        .pipe(gulpif('*.css', cssmin()))
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());

});

gulp.task('style', () => {

    css(`${src}/windows/**/*.css`, `${dist}/windows/`);

    function css(src, dist) {
        gulp.src(src)
            .pipe(cssmin())
            .pipe(gulp.dest(dist))
            .pipe(connect.reload())
        ;
    }
});

gulp.task('generate-json-db', () => { genJsonDb(true) }); // save to dist: true

gulp.task('images', () => {
    gulp.src([`${src}/**/*.jpg`, `${src}/**/*.png`, `${src}/**/*.gif`, `${src}/**/*.svg`])
        //.pipe(imgmin())
        .pipe(gulp.dest(dist));
});

gulp.task('watch', () => {
    gulp.watch([`${src}/windows/**/*.js`], ['babel']);
    gulp.watch([`${src}/app.js`, `${src}/app/**/*.js`, `${src}/app/css/*.css`], ['templates']);
    gulp.watch([`${src}/index.html`, `${src}/windows/**/*.html`], ['templates']);
    gulp.watch([`${src}/app/main.css`, `${src}/windows/**/*.css`], ['style']);
    gulp.watch([`${src}/**/*.jpg`, `${src}/**/*.png`, `${src}/**/*.gif`, `${src}/**/*.svg`], ['images']);
});

gulp.task('connect', () => {

    cmd.exec('httpster -p 45500 -d src --pushstate');
    //cmd.exec('python3 -m http.server 45500', {cwd: `${__dirname}\\src`});
    console.log('start python server on port 45500 for sources');

    /** run chrome autosave plugin */
    cmd.exec('autosave');

    connect.server({
        root: 'dist',
        port: 45501,
        livereload: true
    });

    cmd.exec('"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" http://localhost:45500');
    cmd.exec('nw --url=http://localhost:45501');

});

for (let task in source_gulp) {
    gulp.task(`src-${task}`, source_gulp[task]);
}

gulp.task('default', ['copy', 'babel', 'templates', 'style', 'connect', 'generate-json-db', 'images', 'watch'], () => {});