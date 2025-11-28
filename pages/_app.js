// pages/_app.js
import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';

import { Toaster } from 'sonner';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <Toaster position="top-center" richColors />
        </ThemeProvider>
    );
}

export default MyApp;