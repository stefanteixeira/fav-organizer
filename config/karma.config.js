// Karma configuration
// Generated on Sun Mar 29 2015 21:21:37 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../public/vendor/angular/angular.js',
      '../public/vendor/angular-mocks/angular-mocks.js',
      '../public/vendor/angular-resource/angular-resource.js',
      '../public/vendor/angular-route/angular-route.js',
      '../public/js/main.js',
      '../public/js/controllers/**/*.js',
      '../public/js/services/**/*.js',
      '../test/spec/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../public/js/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'saucelabs'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browserDisconnectTimeout: 30000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,

    // SauceLabs config
    sauceLabs: {
      testName: 'Unit Tests',
      username: 'fav-organizer',
      accessKey: '67f84d23-778a-4def-b579-c98c363a097f'
    },

    // define browsers
    customLaunchers: {
      chrome_win: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '39',
        platform: 'Windows 7'
      },
      firefox_win: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '35',
        platform: 'Windows 7'
      }
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['chrome_win', 'firefox_win'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
