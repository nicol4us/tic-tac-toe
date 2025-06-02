/** @type {import('jest').Config} */
const config = {
    verbose: true,
  };
  
  module.exports = {
    config,
    testEnvironment: 'jest-fixed-jsdom',
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv : ['@testing-library/jest-dom'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    //transformIgnorePatterns : ['/node_modules/(?!@testing-library']
  };


