import winston from 'winston';
import path from 'path';


const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.timestamp(),
      logFormat
  ),
  transports: [
      new winston.transports.File({
          filename: path.join(__dirname, '../logs/app.log'),
          level: 'info', 
      }),
      new winston.transports.Console(), 
  ],
});

export default logger;
