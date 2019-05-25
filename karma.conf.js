module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        basePath: 'test',
        files: [
            '**/*.ts' // *.tsx for React Jsx
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        reporters: ['dots', 'karma-typescript'],
        browsers: ['ChromeHeadless'],
        singleRun: true
    })
}
