const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const validator = require('express-validator');
const app = express();

const errorHandler = require('./error');
const logger = require('./logger');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';

require('./passport');

if (!dev) {
  app.use(
    morgan('combined', {
      stream: {
        write: message => {
          logger.info(message);
        },
      },
    })
  );
}

app.use(bodyParser.json());
app.use(validator());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/', routes);

// Error Handling
app.use((req, res, next) => {
  console.log(req);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
