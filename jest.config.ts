export default {
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript files
    },
    transformIgnorePatterns: [
        '/node_modules/(?!chalk)', // Transpile chalk and its dependencies
    ],
    moduleNameMapper: {
        '^#(.*)$': '<rootDir>/node_modules/$1', // Map # aliases to node_modules
    },
    globals: {
        'ts-jest': {
            useESM: true, // Enable ESM support for TypeScript
        },
    },
    testEnvironment: 'node', // Ensure tests run in a Node.js environment
};