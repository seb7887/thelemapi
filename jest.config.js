module.exports = {
  rootDir: __dirname,
  modulePaths: ['<rootDir>'],
  displayName: 'thelemapi',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/test/**/*.js'],
  collectCoverageFrom: [
    '**/controllers/**',
    '!**/data/**',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
