// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/**/*[tT]ests.ts']
}
