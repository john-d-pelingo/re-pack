const webpackConfig = require('./webpack.config');

module.exports = (config) => {
    let browsers = ['Chrome', 'ChromeCanary'];
    if (process.env.TRAVIS) {
        browsers = ['Chrome_travis_ci'];
    }

    config.set({
        frameworks: ['jasmine'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'node_modules/sinon/pkg/sinon.js',
            'karma.entry.js'
        ],

        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },

        // webpack config
        webpack: webpackConfig,

        // webpack server config
        webpackServer: {
            noInfo: true
        },

        reporters: ['spec'],
        // reporters: ['dots'],

        logLevel: config.LOG_INFO,

        autoWatch: true,

        singleRun: false,

        browsers,

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    });
};
