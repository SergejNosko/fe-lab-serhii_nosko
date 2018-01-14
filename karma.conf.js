const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    files: [
      'tests/index.js'
      /*'tests/app/components/single-task/modelSpec.js'*/
    ],
    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage-istanbul'],

    preprocessors: {
      'tests/index.js': 'webpack'
    },
    webpack: {
      module: {
        rules: [
          // skip assest
          { test: /\.less$/, loader: 'ignore-loader'},
          { test: /\.css$/, loader: 'ignore-loader' },
          { test: /\.hbs$/, loader: 'handlebars-loader' },
          // instrument only testing sources with Istanbul
          {
            test: /\.js$/,
            use: [{
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            },
              {
                loader: 'babel-loader'
              }],
            enforce: 'post',
            exclude: /node_modules|tests|\.spec\.js$|app.js$|view.js|helpers.js|tooltipPlugin.js|tabPlugin.js/
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
};
