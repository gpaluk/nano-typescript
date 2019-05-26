module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        basePath: '',
        files: ['src/**/*.ts', 'test/**/*.ts'],
        preprocessors: {
            'src/**/*.js': ['coverage'],
            'src/**/*.ts': ['karma-typescript', 'coverage'],
            'test/**/*.ts': ['karma-typescript']
        },

        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            include: ['test/**/*.ts', 'src/**/*.ts']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        reporters: ['dots', 'coverage', 'karma-typescript'],
        browsers: ['Chrome'],
        singleRun: true
    })
}
