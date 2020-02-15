// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageReporters: [
    "text",
    "lcov",
  ],
  moduleNameMapper: {
    "\@parser\/(?!tests\/)(.*)$": "<rootDir>/src/parser/$1",
    "\@simulator\/(?!tests\/)(.*)$": "<rootDir>/src/simulator/$1",
    "\@matches\/(?!tests\/)(.*)$": "<rootDir>/src/matches/$1",
    "\@parser\/tests\/(.*)$": "<rootDir>/test/parser/$1",
    "\@simulator\/tests\/(.*)$": "<rootDir>/test/simulator/$1",
    "\@matches\/tests\/(.*)$": "<rootDir>/test/matches/$1"
  },
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "**/test/**/*[tT]ests.ts"
  ],
};
