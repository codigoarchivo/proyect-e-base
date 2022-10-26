import { useContext } from 'react';

import NextLink from 'next/link';

import AppBar from '@mui/material/AppBar';

import Button from '@mui/material/Button';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';

import { UiContext } from '../../context';

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext(UiContext);

    return (
        <AppBar>
            <Toolbar>
                <NextLink href={'/'} passHref>
                    <Link display={'flex'} alignItems={'center'}>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                {/* Pantallas pequeñas */}

                <Button onClick={toggleSideMenu}>Menu</Button>
            </Toolbar>
        </AppBar >
    )
};