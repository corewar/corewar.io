// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
/* eslint-disable */
export default {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    collectCoverageFrom: ['./src/**/*.ts'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
        '@test/(.*)$': '<rootDir>/test/$1'
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/**/*spec.ts'],
    transformIgnorePatterns: ['node_modules/(?!(corewar)/)'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                tsconfig: {
                    strict: false,
                    strictNullChecks: false,
                    noImplicitThis: false
                }
            }
        ]
    }
}
