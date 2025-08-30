// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/**/*[tT]ests.ts'],
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^@parser/(.*)$': '<rootDir>/src/parser/$1',
        '^@simulator/(.*)$': '<rootDir>/src/simulator/$1',
        '^@matches/(.*)$': '<rootDir>/src/matches/$1'
    },
    globals: {
        'ts-jest': {
            useESM: true
        }
    },
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: {
                    strict: false,
                    noUnusedLocals: false,
                    noUnusedParameters: false,
                    strictNullChecks: false,
                    noImplicitThis: false
                }
            }
        ]
    }
}
