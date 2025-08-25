import winston from 'winston';
import path from 'path';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Define console format
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, service, ...meta }) => {
    return `${timestamp} [${service}] ${level}: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

// Create logger
export const createLogger = (service: string) => {
  const logger = winston.createLogger({
    level: process.env['NODE_ENV'] === 'production' ? 'info' : 'debug',
    defaultMeta: { service },
    format: logFormat,
    transports: [
      // Write logs to console
      new winston.transports.Console({
        format: consoleFormat,
      }),
    ],
  });

  // Add file transport in production
  if (process.env['NODE_ENV'] === 'production') {
    logger.add(
      new winston.transports.File({
        filename: path.join('logs', 'error.log'),
        level: 'error',
        maxsize: 10485760, // 10MB
        maxFiles: 5,
      })
    );
    
    logger.add(
      new winston.transports.File({
        filename: path.join('logs', 'combined.log'),
        maxsize: 10485760, // 10MB
        maxFiles: 5,
      })
    );
  }

  return logger;
};

// Export default logger
export default createLogger('app');