// HTTP Security Headers & Hardening Middleware
// Mitigates clickjacking, MIME-type sniffing, cross-site leaks, and server fingerprinting

export function securityHeaders(req, res, next) {
  // 1. Prevent MIME-type confusion / sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // 2. Prevent Clickjacking / framing attacks
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // 3. Legacy XSS filter activation
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // 4. Referrer control to protect sensitive candidate query params
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 5. Restrict device capabilities
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');

  // 6. Mask server identity
  res.removeHeader('X-Powered-By');

  next();
}

export default securityHeaders;

