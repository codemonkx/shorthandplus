// In-Memory Sliding-Window IP Rate Limiting Middleware
// Zero-dependency, lightweight, high-performance brute-force protection

export function createRateLimiter({
  windowMs = 15 * 60 * 1000, // 15 minutes default
  max = 10,                   // 10 requests per window
  message = 'Too many requests from this IP. Please try again later.'
} = {}) {
  const requests = new Map();

  // Periodically clean up expired entries every 5 minutes to avoid memory leaks
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of requests.entries()) {
      if (now > record.resetTime) {
        requests.delete(ip);
      }
    }
  }, 5 * 60 * 1000);

  // Unref cleanup timer so it does not block Node.js process shutdown
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return function rateLimiterMiddleware(req, res, next) {
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
               req.socket?.remoteAddress || 
               '127.0.0.1';

    const now = Date.now();
    let record = requests.get(ip);

    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + windowMs
      };
      requests.set(ip, record);
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', max - 1);
      return next();
    }

    record.count += 1;
    const remaining = Math.max(0, max - record.count);
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', remaining);

    if (record.count > max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        message,
        retryAfterSeconds
      });
    }

    next();
  };
}

// 1. Authentication Rate Limiter: 60 attempts per 10 minutes in dev, 15 in production
export const authRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 15 : 100,
  message: 'Too many authentication attempts. Please wait 10 minutes before retrying.'
});

// 2. Password Reset Request Limiter: 30 requests per 15 minutes in dev, 5 in production
export const passwordResetLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 5 : 50,
  message: 'Too many password reset requests. Please wait 15 minutes.'
});

// 3. Audio Upload Limiter: 50 uploads per 10 minutes in dev, 10 in production
export const uploadRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 10 : 50,
  message: 'Upload quota reached. Maximum uploads exceeded.'
});

