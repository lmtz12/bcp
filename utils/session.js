// Session utility for tracking users across form submissions

/**
 * Generate a unique session ID for tracking users
 * Format: BCP-XXXXXX (6 characters)
 */
export function generateSessionId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'BCP-';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Get or create session ID from localStorage
 */
export function getSessionId() {
    if (typeof window === 'undefined') return null;

    let sessionId = localStorage.getItem('bcp_session_id');
    if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('bcp_session_id', sessionId);
    }
    return sessionId;
}

/**
 * Clear session ID (for testing purposes)
 */
export function clearSessionId() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('bcp_session_id');
    }
}
