import NextLink from 'next/link';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';

import Link from '@mui/material/Link';

import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';

import Chip from '@mui/material/Chip';

import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';

import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';

import { ShopLayout } from '../../components/layouts';

import { CardList, OrderSumary } from '../../components/cart';

const OrderPage = () => {
    return (
        <ShopLayout title={'Resumen de la Orden 6562626262'} pageDescription={'Resumen de la Orden'}>
            <Typography variant={'h1'} component={'h1'}>
                Orden: ABC4343
            </Typography>
            {/* <Chip
                sx={{ my: 2 }}
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined />}
            /> */}
            <Chip
                sx={{ my: 2 }}
                label='Orden ya fue pagada'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CardList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className={'summary-card '}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant='h2'>Resumen (3 prioductos)</Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                    <NextLink href='/checkout/address' passHref>
                                        <Link underline='always'>Editar</Link>
                                    </NextLink>
                                </Box>

                                <Stack spacing={1}>
                                    <Typography>Jackson Quintero</Typography>
                                    <Typography>5565 Algun Lugar</Typography>
                                    <Typography>Carvajal El Rosal</Typography>
                                    <Typography>Venezuela</Typography>
                                    <Typography>+58 6263206326</Typography>
                                </Stack>

                                <Divider sx={{ my: 1 }} />


                                <Box display='flex' justifyContent='end'>
                                    <NextLink href='/cart' passHref>
                                        <Link underline='always'>Editar</Link>
                                    </NextLink>
                                </Box>

                                <OrderSumary />

                                <h1>Pagar</h1>
                                
                                <Chip
                                    sx={{ my: 2 }}
                                    label='Orden ya fue pagada'
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage