import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import Image from 'next/image';

const Header = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#05297A',
                boxShadow: 'none',
                height: '70px',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3 }}>
                <Image
                    src="/logo.png"
                    alt="BanCoppel"
                    width={187}
                    height={33}
                />

            </Toolbar>
        </AppBar>
    );
};

export default Header;
