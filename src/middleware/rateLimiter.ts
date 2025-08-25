import { rateLimit } from 'express-rate-limit';
import { createLogger } from '../utils/logger';

const logger = createLogger('rate-limiter');

// Create a rate limiter middleware
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-7', // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { message: 'Too many requests, please try again later.' },
  handler: (req, res, _options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  },
});

// Create a more strict rate limiter for auth routes
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many login attempts, please try again later.' },
  handler: (req, res, _options) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ message: 'Too many login attempts, please try again later.' });
  },
});

export default { apiLimiter, authLimiter };