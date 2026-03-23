import rateLimit from 'express-rate-limit';

export const infoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

export const downloadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Download limit reached. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
