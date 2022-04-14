/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ["<rootDir>/__tests__/use-cases", "<rootDir>/__tests__/entry-points/express/specs"],
    setupFiles: ["<rootDir>/__tests__/config/set-env-vars.config.ts"],
    verbose: true,
    collectCoverage: true,
    testTimeout: 100000
};
