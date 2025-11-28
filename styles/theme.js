import { createTheme } from '@mui/material/styles';

// BanCoppel Authentic Colors (from serviciomovil-digital.com)
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#05297A', // BanCoppel Blue (exact from reference)
            light: '#3399FF',
            dark: '#021A4D',
            contrastText: '#fff',
        },
        secondary: {
            main: '#F7931E', // Orange accent
            light: '#FF6B00',
            dark: '#D67A00',
            contrastText: '#fff',
        },
        background: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
        error: {
            main: '#D32F2F',
        },
        warning: {
            main: '#F7931E',
        },
        success: {
            main: '#388E3C',
        },
    },
    typography: {
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        h5: {
            fontWeight: 700,
            fontSize: '1.5rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    padding: '10px 24px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                },
                contained: {
                    backgroundColor: '#FFE74D',
                    color: '#05297A',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: '#FFD700',
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                        '& fieldset': {
                            borderColor: '#CCCCCC',
                        },
                        '&:hover fieldset': {
                            borderColor: '#0066CC',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#0066CC',
                            borderWidth: 2,
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#0066CC',
                    '&.Mui-checked': {
                        color: '#0066CC',
                    },
                },
            },
        },
    },
});

export default theme;
