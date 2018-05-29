
exports.config = {
    multiCapabilities: [
        {
            'browserName': 'chrome',
            'platform': 'ANY'
        }
    ],
    maxSessions: 1,
    directConnect: true,
    //chromeOnly: true,
    framework: 'jasmine2',
    specs: ['test/spec_test.js'],
    getPageTimeout: 50000,
    allScriptsTimeout: 50000,
    baseUrl: 'http://localhost:3456'
};
