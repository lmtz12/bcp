export default async function handler(req, res) {
    const { method } = req;

    // SECURITY FIX: Added return statement to prevent double responses
    if (method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { message } = req.body;

    // SECURITY FIX: Added return statement to prevent double responses
    if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Get Telegram credentials from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.error('Telegram credentials not configured');
        return res.status(500).json({
            success: false,
            message: 'Server configuration error'
        });
    }

    try {
        // Send message to Telegram using Bot API
        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML', // Enable HTML formatting for better structure
            }),
        });

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.description || 'Telegram API error');
        }

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('Error sending to Telegram:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to send message'
        });
    }
}