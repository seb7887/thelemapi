const fs = require('fs');
const winston = require('winston');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'debug',
      json: true,
      filename: './logs/debug.log',
      maxFiles: 7,
      handleExceptions: true,
    }),
    new winston.transports.Console({
      level: 'debug',
      json: true,
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
