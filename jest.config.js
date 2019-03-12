module.exports = {
  rootDir: __dirname,
  modulePaths: ['<rootDir>'],
  displayName: 'thelemapi',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/test/**/*.js'],
  collectCoverageFrom: [
    '**/controllers/**',
    '**/routes/**',
    '**/middleware/**',
    '**/passport/**',
    './app.js',
    '!**/data/**',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/coverage/**',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
