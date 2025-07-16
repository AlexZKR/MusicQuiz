// jest.config.cjs
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    // load setup before tests
    setupFiles: ['<rootDir>/jest.setup.ts'],

    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            { tsconfig: 'tsconfig.jest.json' }
        ],
    },

    coveragePathIgnorePatterns: [
        "<rootDir>/test/"
    ],

    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    },

    transformIgnorePatterns: ['/node_modules/'],

    testMatch: ['<rootDir>/test/**/*.(spec|test).(ts|tsx|js)'],
};
