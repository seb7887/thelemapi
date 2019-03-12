const Sentry = require('@sentry/node');
const logger = require('../logger');

Sentry.init({
  dsn: 'https://83c50456a02545ef993a13561a1ff318@sentry.io/1413863',
});

const logError = err => {
  logger.error(err);
};

const reportError = err => {
  Sentry.captureEvent(err);
};

const errorHandler = (error, req, res, next) => {
  logError(error);
  reportError(error);
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'Something went wrong',
    },
  });
};

module.exports = errorHandler;
