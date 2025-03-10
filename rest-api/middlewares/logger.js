const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.timestamp(),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

module.exports = function (msg) {
  logger.log('info', msg);
};