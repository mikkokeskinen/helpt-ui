var webpackCfg = require('./webpack.config');

process.env.CHROME_BIN = require('puppeteer').executablePath();
// Set node environment to testing
process.env.NODE_ENV = 'test';


module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'ChromeHeadless' ],
    files: [
      'test/loadtests.js'
    ],
    port: 8000,
    captureTimeout: 60000,
    frameworks: [ 'mocha', 'chai' ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    mochaReporter: {
      showDiff: true
    },
    preprocessors: {
      'test/loadtests.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'lcov' },
        { type: 'text' }
      ]
    }
  });
};
