/*global module */
module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'dist/ismoak.min.js',
            'src/**/*-test.js'
        ],
        reporters: ['progress'],
        port: 8889,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};