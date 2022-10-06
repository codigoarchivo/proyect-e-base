import NextLink from 'next/link';

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

import { CardList, OrderSumary } from '../../components/cart';

const SummaryPage = () => {
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

                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar Orden
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage