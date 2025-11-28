import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Header from '@/components/header';

import Footer from '@/components/Footer';

const Final = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Box
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
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Nos pondremos en contacto contigo
                    </Typography>

                    <Typography component="p" variant="body2" sx={{ mt: 2 }}>
                        Estamos procesando tu solicitud. Nos pondremos en contacto contigo en breve.
                    </Typography>

                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Final;
