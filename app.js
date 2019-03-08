const express = require('express');
const morgan = require('morgan');
const app = express();

const logger = require('./logger');
const routes = require('./routes');

app.use(
  morgan('combined', {
    stream: {
      write: message => {
        logger.info(message);
      },
    },
  }),
);

app.use('/', routes);

module.exports = app;
