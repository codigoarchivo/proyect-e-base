import { useContext, useState } from 'react';

import NextLink from 'next/link';

import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';

import Button from '@mui/material/Button';

import Badge from '@mui/material/Badge';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

import InputAdornment from '@mui/material/InputAdornment';

import ClearOutlined from '@mui/icons-material/ClearOutlined';

import { Input } from '@mui/material';

import Link from '@mui/material/Link';

import { CartContext, UiContext } from '../../context';

export const Navbar = () => {

    const { asPath, push } = useRouter();

    const { toggleSideMenu } = useContext(UiContext);

    const { numberOfItems } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');

    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;

        push(`/search/${searchTerm}`);
    }

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

                <Box className='fadeIn' sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' } }}>
                    <NextLink href={'/category/men'} passHref>
                        <Link>
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombre</Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/women'} passHref>
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/kid'} passHref>
                        <Link>
                            <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                {/* Pantallas pequeñas */}
                {
                    isSearchVisible
                        ? <Input
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            className='fadeIn'
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : ''}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setIsSearchVisible(false)}
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        : (
                            <IconButton
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                onClick={() => setIsSearchVisible(true)}
                            >
                                <SearchOutlinedIcon />
                            </IconButton>
                        )
                }
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlinedIcon />
                </IconButton>
                <NextLink href={'/cart'} passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color={'secondary'}>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
                <Button onClick={toggleSideMenu}>Menu</Button>
            </Toolbar>
        </AppBar >
    )
};