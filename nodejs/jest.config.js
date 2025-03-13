// jest.config.js
module.exports = {
    preset: 'ts-jest', // Use ts-jest for TypeScript support
    testEnvironment: 'node', // Run tests in a Node.js environment
    testMatch: ['**/*.tests.ts'], // Look for test files with .tests.ts extension
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], // File extensions to consider for modules
    moduleNameMapper: {
        // If you have any path aliases in your tsconfig.json, map them here
        // Example: '^@/(.*)$': '<rootDir>/src/$1'
    },
    collectCoverage: true, // Enable code coverage collection
    coverageDirectory: 'coverage', // Output directory for coverage reports
    coverageReporters: ['text', 'lcov', 'clover'], // Coverage report formats
    collectCoverageFrom: [
        'lib/**/*.ts', // Collect coverage from files in the lib directory
        '!lib/**/*.tests.ts', // Exclude test files from coverage
    ],
    // Add any additional Jest configurations as needed
};