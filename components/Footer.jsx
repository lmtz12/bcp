import React from 'react';
import { Box, Typography, Container, Link, Grid } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#F5F5F5',
                py: 4,
                mt: 'auto',
                borderTop: '1px solid #E0E0E0',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary" gutterBottom fontWeight="bold">
                            Contacto
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                            Lada sin costo en México
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight="bold">
                            800 122 6771
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mt: 1, mb: 0.5 }}>
                            Desde Estados Unidos y Canadá
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight="bold">
                            866 254 3793
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary" gutterBottom fontWeight="bold">
                            Enlaces
                        </Typography>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                            Corresponsales
                        </Link>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                            Centro de ayuda
                        </Link>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', fontSize: '0.75rem' }}>
                            Sucursales y cajeros
                        </Link>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary" gutterBottom fontWeight="bold">
                            Información Legal
                        </Typography>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                            Términos y Condiciones de Uso
                        </Link>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                            Aviso de Privacidad
                        </Link>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', fontSize: '0.75rem' }}>
                            Mapa de sitio
                        </Link>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary" gutterBottom fontWeight="bold">
                            Servicios
                        </Typography>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                            Solicita tu Tarjeta de Crédito
                        </Link>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                            Pide tu Crédito BanCoppel
                        </Link>
                        <Link href="#" color="primary" variant="body2" sx={{ display: 'block', fontSize: '0.75rem' }}>
                            Consulta costos y comisiones
                        </Link>
                    </Grid>
                </Grid>

                <Box sx={{ borderTop: '1px solid #E0E0E0', pt: 2, mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', mb: 1, fontStyle: 'italic' }}>
                        "Afore Coppel S.A. de C.V., BanCoppel S.A. Institución de Banca Múltiple, Fundación Coppel A.C. y Coppel S.A. de C.V. son personas morales distintas e independientes entre sí, así como de cualquiera de sus negocios asociados o vinculados".
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>
                        Copyright 2025 BanCoppel S.A Institución de Banca Múltiple - Todos los derechos reservados
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
