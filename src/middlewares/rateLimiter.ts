import rateLimit from 'express-rate-limit';
import { config } from '../config/config';

const limiter = rateLimit({
    windowMs: +config.rateLimiter.windowMs, 
    max: +config.rateLimiter.max, 
    message: config.rateLimiter.message,
});

// Export the rate limiter
export const rateLimiter =  limiter;
