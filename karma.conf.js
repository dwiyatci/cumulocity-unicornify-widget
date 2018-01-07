const _ = require('lodash');
const glob = require('glob');
const { readJsonSync } = require('fs-extra');
const {
  join,
  dirname
} = require('path');

// const APP_CONTEXT_PATH = process.argv[4] || 'pocs';

const pluginJsFiles = _(glob.sync('plugins/*/cumulocity.json'))
  .reject(p => p.match(/plugins\/(_x|@c8y)/i))
  .flatMap(manifestFile =>
    _.map(readJsonSync(manifestFile).js, (jsFile) => {
      let baseDir = dirname(manifestFile);

      if (jsFile.match(/^(node_modules|bower_components)/i)) {
        baseDir = join(baseDir, '../..');
      }

      return join(baseDir, jsFile);
    })
  )
  .compact()
  .value();

module.exports = (config) => {
  config.set({
    singleRun: true,

    files: [
      'node_modules/cumulocity-ui-full/core{,_*}/main.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'scripts/test-helper.js',
      ...pluginJsFiles,
      'plugins/*/**/*.spec.js', // match plugins/p/x.spec.js but not plugins/x.spec.js
      'plugins/*/**/*.html',
      { pattern: 'plugins/**/*.json', included: false }
    ],

    frameworks: ['jasmine'],

    browsers: ['ChromeHeadless'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-ng-html2js-preprocessor'),
      require('karma-babel-preprocessor'),
      { 'preprocessor:c8y-pluginpath': ['factory', c8yPluginPathPreprocessor] }
    ],

    preprocessors: {
      'scripts/test-helper.js': ['babel'],

      // Match files in all plugins subfolders except vendor/ or lib/.
      'plugins/*/{*.js,!(vendor)/**/*.js,!(lib)/**/*.js}': ['c8y-pluginpath', 'babel'],
      'plugins/*/**/*.html': ['ng-html2js']
    },

    reporters: ['spec'],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: false, // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },

    ngHtml2JsPreprocessor: {
      cacheIdFromPath: filepath => filepath.replace(/^plugins\//i, ''),
      moduleName: 'c8yHtml.test'
    },

    logLevel: config.LOG_ERROR,

    client: {
      captureConsole: true
    }
  });
};

function c8yPluginPathPreprocessor() {
  return (content, file, done) => {
    done(content.replace(/:::PLUGIN_PATH:::/g, computePluginPath(file.originalPath)));
  };
}

function computePluginPath(filepath) {
  const [, pluginName] = (/plugins\/(.+?)\/+?/.exec(filepath));
  // const pluginPath = `${APP_CONTEXT_PATH}_${pluginName}`;
  const pluginPath = pluginName;

  return pluginPath;
}
