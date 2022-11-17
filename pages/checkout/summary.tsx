import { useContext, useEffect, useState } from 'react';

import NextLink from 'next/link';

import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';

import Link from '@mui/material/Link';

import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';

import { ShopLayout } from '../../components/layouts';

import { CardList } from '../../components/cart';

import { CartContext } from '../../context';
import { Chip } from '@mui/material';

// import { countries } from '../../utils';

const SummaryPage = () => {
    const { push, replace } = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if (!Cookies.get('firstName')) {
            push('/checkout/address');
        }
    }, [push]);


    const onCreateOrder = async () => {
        setIsPosting(true);

        const { hasError, message } = await createOrder();

        if (hasError) {
            setIsPosting(false);
            setErrorMessage(message!);
            return
        }

        replace(`/orders/${message}`);
    }

    if (!shippingAddress) {
        return <></>;
    }

    const {
        firstName,
        lastName,
        address,
        address2 = '',
        zip,
        city,
        country,
        phone,
    } = shippingAddress;

    return (
        <ShopLayout title={'Resumen de Orden'} pageDescription={'Resumen de la Orden'}>
            <Typography variant={'h1'} component={'h1'}>
                Resumen de la Orden
            </Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CardList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className={'summary-card '}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                    <NextLink href='/checkout/address' passHref>
                                        <Link underline='always'>Editar</Link>
                                    </NextLink>
                                </Box>

                                <Stack spacing={1}>
                                    <Typography>{firstName} {lastName}</Typography>
                                    <Typography>{address}{address2 ? `, ${address2}` : ''}</Typography>
                                    <Typography>{city} {zip}</Typography>
                                    {/* <Typography>{countries.find(c => c.code === country)?.name}</Typography> */}
                                    <Typography>{country}</Typography>
                                    <Typography>{phone}</Typography>
                                </Stack>

                                <Divider sx={{ my: 1 }} />


                                <Box display='flex' justifyContent='end'>
                                    <NextLink href='/cart' passHref>
                                        <Link underline='always'>Editar</Link>
                                    </NextLink>
                                </Box>

                                <Box sx={{ mt: 3 }} display='flex' flexDirection={'column'}>
                                    <Button
                                        onClick={onCreateOrder}
                                        color='secondary'
                                        className='circular-btn'
                                        fullWidth
                                        disabled={isPosting}
                                    >
                                        Confirmar Orden
                                    </Button>
                                    <Chip
                                        color='error'
                                        label={errorMessage}
                                        sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                    />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage