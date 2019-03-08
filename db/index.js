const { DataStore } = require('notarealdb');

const store = new DataStore('../data');

module.exports = {
  liber777: store.collection('liber777'),
  users: store.collection('users'),
};
