const fs = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');

const logDir = `${__dirname}/../logs`;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const infoTransport = new (winston.transports.DailyRotateFile)({
  dirname: logDir,
  level: 'info',
  filename: 'info-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const errorTransport = new (winston.transports.DailyRotateFile)({
  dirname: logDir,
  level: 'error',
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  transports: [infoTransport, errorTransport],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = { logger, stream };
