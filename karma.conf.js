module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/es6-shim/es6-shim.js',
            'source/javascript/**/*.js',
            'source/tests/**/*Test.js'
        ],
        preprocessors: {
            'source/javascript/**/*.js': ['coverage']
        },
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],
        reporters: ['progress', 'coverage'],
        port: 9878,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autowatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity,
        coverageReporter: {
            includeAllSources: true,
            dir: 'coverage/',
            reporters: [
                // { type: "html", subdir: "html" },
                { type: 'text' },
                { type: 'text-summary' }
            ]
        }
    });
};