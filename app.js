const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const app = express();

const logger = require('./logger');
const routes = require('./routes');

require('./passport');

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
app.use(cookieParser());

app.use('/', routes);

module.exports = app;
