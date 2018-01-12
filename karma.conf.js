/*const path = require('path');

 module.exports = function (config) {
 config.set({
 frameworks: ['jasmine'],
 browsers: ['Chrome'],
 files: [
 'tests/app/components/single-task/modelSpec.js'
 ],
 // coverage reporter generates the coverage
 reporters: ['progress'],

 preprocessors: {
 'tests/app/components/single-task/modelSpec.js': 'webpack'
 },
 webpack: {
 module: {
 rules: [
 // skip assest
 {test: /\.less$/, loader: 'ignore-loader'},
 {test: /\.css$/, loader: 'ignore-loader'},
 {test: /\.hbs$/, loader: 'ignore-loader'},
 // instrument only testing sources with Istanbul
 {
 test: /\.js$/,
 use: {
 loader: 'istanbul-instrumenter-loader',
 options: {esModules: true}
 },
 enforce: 'post',
 exclude: /node_modules|test|\.spec\.js$|^app.js$/
 }]
 },
 devtool: 'inline-source-map'
 },
 // optionally, configure the reporter
 coverageIstanbulReporter: {
 reports: ['html', 'lcovonly', 'text-summary'],
 dir: path.join(__dirname, 'coverage'),
 fixWebpackSourcePaths: true,
 html: {
 // outputs the report in ./coverage/html
 subdir: 'html'
 }
 }
 });
 };*/

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      "src/app/components/single-task/mvc/model.js",
      'tests/app/components/single-task/modelSpec.js'
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-babel-preprocessor'
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/app/components/single-task/mvc/model.js': ['babel']
    },

    babelPreprocessor: {
      options: {
        presets: ['env']
      }
    },

    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};
