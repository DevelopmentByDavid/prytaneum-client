// jest.config.js
// Example: extending a pre-built Jest configuration file
module.exports = {
    // collectCoverage: true,
    // coverageDirectory: './coverage',
    // coverageReporters: ['text'],
    // testTimeout: 500,
    modulePaths: ['<rootDir>/src'],
    ...require('@snowpack/app-scripts-react/jest.config.js')(),
    // roots: ['<rootDir>/src'],
    // collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    // testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    // transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
    // modulePaths: ['/home/david/Documents/learn/prytaneum-cra-v4/src'],
    // moduleNameMapper: {
    //     '^react-native$': 'react-native-web',
    //     '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // },
    // moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    // bail: true,
};
