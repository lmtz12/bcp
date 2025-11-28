// Validation utilities for form inputs

/**
 * Validates phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const isPhoneValid = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

/**
 * Validates card number (16 digits) with Luhn algorithm
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} - True if valid
 */
export const isCardValid = (cardNumber) => {
    // First check length
    if (!/^[0-9]{16}$/.test(cardNumber)) {
        return false;
    }

    // Luhn algorithm for card validation
    let sum = 0;
    let isEven = false;

    // Loop through values from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

/**
 * Validates NIP (4 digits)
 * @param {string} nip - NIP to validate
 * @returns {boolean} - True if valid
 */
export const isNIPValid = (nip) => {
    const nipRegex = /^[0-9]{4}$/;
    return nipRegex.test(nip);
};

/**
 * Validates last two digits (2 digits)
 * @param {string} digits - Last two digits to validate
 * @returns {boolean} - True if valid
 */
export const isLastTwoDigitsValid = (digits) => {
    const regex = /^[0-9]{2}$/;
    return regex.test(digits);
};

/**
 * Validates OTP code (6 digits)
 * @param {string} otp - OTP to validate
 * @returns {boolean} - True if valid
 */
export const isOTPValid = (otp) => {
    const otpRegex = /^[0-9]{6}$/;
    return otpRegex.test(otp);
};

/**
 * Validates age (must be 18 or older)
 * @param {string} birthdate - Birthdate string (YYYY-MM-DD)
 * @returns {boolean} - True if 18 or older
 */
export const isAdult = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1 >= 18;
    }

    return age >= 18;
};

/**
 * Sanitizes input by removing non-numeric characters
 * @param {string} value - Value to sanitize
 * @returns {string} - Sanitized value
 */
export const sanitizeNumeric = (value) => {
    return value.replace(/[^0-9]/g, '');
};

/**
 * Prevents invalid key presses for numeric inputs
 * @param {KeyboardEvent} event - Keyboard event
 */
export const preventInvalidNumericInput = (event) => {
    const invalidChars = ['e', 'E', '+', '-', '.'];
    if (invalidChars.includes(event.key)) {
        event.preventDefault();
    }
};
