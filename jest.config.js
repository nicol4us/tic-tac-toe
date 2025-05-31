/** @type {import('jest').Config} */
const config = {
    verbose: true,
  };
  
  module.exports = {
    config,
    testEnvironment: 'jest-fixed-jsdom',
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFileAfterEnv : ['<rootDir>/jest.setup.js']
  };
