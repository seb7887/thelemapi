require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const config = {
  port: process.env.PORT || 7000,
  jwtSecret: dev ? 'jwtsecret' : process.env.SECRET,
};

module.exports = config;
