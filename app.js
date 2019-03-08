const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();

const logger = require('./logger');
const routes = require('./routes');
const auth = require('./auth');

app.use(
  morgan('combined', {
    stream: {
      write: message => {
        logger.info(message);
      },
    },
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(auth);

app.use('/', routes);

module.exports = app;
