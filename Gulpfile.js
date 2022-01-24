const { src, dest, watch, series } = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

let sourcemaps = true;

function scssTask() {
    return src('app/scss/**/*.scss', { sourcemaps })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('dist/css', { sourcemaps: '.' }));
}

function jsTask() {
    return src('app/js/**/*.js', { sourcemaps })
        .pipe(terser())
        .pipe(dest('dist/js', { sourcemaps: '.' }));
}

function htmlTask() {
    return src('app/**/*.html')
        .pipe(dest('dist'));
}

function serveTask(cb) {
    browsersync.init({
        server: {
            baseDir: 'dist'
        }    
    });

    cb();
}

function reloadTask(cb) {
    browsersync.reload();
    cb();
}

function cleanDistTask() {
    return del('dist/**', { force: true });
}

function copyTask() {
    return src([
        'app/**/*',
        '!app/**/*.html',
        '!app/**/*.scss',
        '!app/**/*.js',
        '!app/js',
        '!app/scss'
    ])
    .pipe(dest('dist'));
}

function disableSourcemaps(cb) { sourcemaps = false; cb(); }

function watchTask() {
    watch([
        'app/**/*',
        '!app/**/*.html',
        '!app/**/*.scss',
        '!app/**/*.js'
    ],                     series(copyTask, reloadTask));
    watch('app/**/*.html', series(htmlTask, reloadTask));
    watch('app/**/*.scss', series(scssTask, reloadTask));
    watch('app/**/*.js',   series(jsTask, reloadTask));
}

exports.default = series(
    copyTask,
    scssTask,
    jsTask,
    htmlTask,
    serveTask,
    watchTask
);

exports.production = series(
    disableSourcemaps,
    cleanDistTask,
    copyTask,
    scssTask,
    jsTask,
    htmlTask
);