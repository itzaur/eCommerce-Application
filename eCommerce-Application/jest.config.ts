/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.jsx'],
    transform: {
        'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/svgTransform.cjs',
    },
    transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
    verbose: true,
};

export default config;
