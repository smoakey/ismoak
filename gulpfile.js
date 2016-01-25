/*global __dirname, require */
(function () {
    'use strict';
    var del                      = require('del'),
        gulp                     = require('gulp'),
        gulpAngularTemplatecache = require('gulp-angular-templatecache'),
        gulpLess                 = require('gulp-less'),
        cssnano                  = require('gulp-cssnano'),
        gulpConcat               = require('gulp-concat'),
        gulpJSHint               = require('gulp-jshint'),
        gulpNgAnnotate           = require('gulp-ng-annotate'),
        gulpUglify               = require('gulp-uglify'),
        jSHintStylish            = require('jshint-stylish'),
        karmaServer              = require('karma').Server,
        runSequence              = require('run-sequence'),
        mergeStream              = require('merge-stream');

    function getTemplateCache() {
        return gulp
            .src('./src/ismoak.html')
            .pipe(gulpAngularTemplatecache({
                module:   'ismoak.templates',
                standalone: true
            }));
    }

    gulp.task('clean', function (cb) {
        return del(['dist'], cb);
    });

    gulp.task('annotate-and-compress', function () {
        var templates = getTemplateCache();

        var js = gulp.src([
                '!src/*-test.js',
                './src/*-module.js',
                './src/*.js',
            ]);

        return mergeStream(js, templates)
            .pipe(gulpConcat('ismoak.min.js'))
            .pipe(gulpNgAnnotate())
            .pipe(gulpUglify())
            .pipe(gulp.dest('dist'));
    });

    gulp.task('less', function () {
        return gulp.src('./src/**/*.less')
            .pipe(gulpLess())
            .pipe(cssnano())
            .pipe(gulp.dest('dist'));
    })

    gulp.task('build', function (cb) {
        runSequence('clean', 'annotate-and-compress', 'less', cb);
    });

    gulp.task('test', ['build'], function (cb) {
        runSequence('jshint', 'test:unit', cb);
    });

    gulp.task('jshint', function () {
        return gulp
            .src('src/*.js')
            .pipe(gulpJSHint())
            .pipe(gulpJSHint.reporter(jSHintStylish));
    });

    gulp.task('test:unit', function (cb) {
        new karmaServer({
            configFile: __dirname + '/karma.conf.js'
        }, function () {
            cb();
        }).start();
    });

    gulp.task('default', function (cb) {
        runSequence('test', cb);
    });
}());