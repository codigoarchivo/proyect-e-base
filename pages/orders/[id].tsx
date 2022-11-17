import { useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { getSession } from 'next-auth/react';

import { useRouter } from 'next/router';

import { PayPalButtons } from "@paypal/react-paypal-js";

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';

import Chip from '@mui/material/Chip';

import { CircularProgress } from '@mui/material';

import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';

import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';

import { ShopLayout } from '../../components/layouts';

import { CardList, OrderSumary } from '../../components/cart';

import { dbOrders } from '../../database';

import { IOrder } from '../../interfaces';

import { tesloApi } from '../../api';


interface Props {
    order: IOrder
}

export type OrderResponseBody = {
    id: string;
    status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};



const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order

    const { back, reload } = useRouter();

    const [isPaying, setIsPaying] = useState(false);


    const onOrderCompleted = async (details: OrderResponseBody) => {

        if (details.status !== 'COMPLETED') {
            return alert('No hay pago en Paypal');
        }

        setIsPaying(true);

        try {

            const { data } = await tesloApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id
            });

            reload();

        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert('Error');
        }
    };

    return (
        <ShopLayout title={`Resumen de la Orden ${order._id}`} pageDescription={'Resumen de la Orden'}>
            <Typography variant={'h1'} component={'h1'}>
                Orden: {order._id}
            </Typography>

            {
                order.isPaid ? (
                    <Chip
                        sx={{ my: 2 }}
                        label='Orden ya fue pagada'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                    />
                ) : (
                    <Chip
                        sx={{ my: 2 }}
                        label='Pendiente de pago'
                        variant='outlined'
                        color='error'
                        icon={<CreditCardOffOutlined />}
                    />
                )
            }
            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CardList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className={'summary-card '}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography sx={{ cursor: 'pointer' }} onClick={() => back()} variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'Productos' : 'Producto'})</Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                </Box>

                                <Stack spacing={1}>
                                    <Typography>{shippingAddress?.firstName} {shippingAddress?.lastName}</Typography>
                                    <Typography>{shippingAddress?.address} {shippingAddress?.address2 ? shippingAddress?.address2 : ''}</Typography>
                                    <Typography>{shippingAddress?.city} {shippingAddress?.zip}</Typography>
                                    <Typography>{shippingAddress?.country}</Typography>
                                    <Typography>{shippingAddress?.phone}</Typography>
                                </Stack>

                                <Divider sx={{ my: 1 }} />

                                <OrderSumary
                                    orderValues={{
                                        numberOfItems: order.numberOfItems,
                                        subTotal: order.subTotal,
                                        total: order.total,
                                        tax: order.tax,
                                    }}
                                />
                                <Box sx={{ mt: 3 }} display='flex' flexDirection={'column'}>
                                    <Stack
                                        display={isPaying ? 'flex' : 'none'}
                                        alignItems={'center'}
                                        className={'fadeIn'}
                                    >
                                        <CircularProgress />
                                    </Stack>
                                    <Stack
                                        flexDirection='column'
                                        flex={1}
                                        display={isPaying ? 'none' : 'flex'}
                                    >
                                        {
                                            order.isPaid
                                                ? (
                                                    <Chip
                                                        sx={{ my: 2 }}
                                                        label="Orden ya fue pagada"
                                                        variant='outlined'
                                                        color="success"
                                                        icon={<CreditScoreOutlined />}
                                                    />

                                                ) : (
                                                    <PayPalButtons
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [
                                                                    {
                                                                        amount: {
                                                                            value: `${order.total}`,
                                                                        },
                                                                    },
                                                                ],
                                                            });
                                                        }}
                                                        onApprove={(data, actions) => {
                                                            return actions.order!.capture().then((details) => {
                                                                onOrderCompleted(details);
                                                                // console.log({ details  })
                                                                // const name = details.payer.name.given_name;
                                                                // alert(`Transaction completed by ${name}`);
                                                            });
                                                        }}
                                                    />
                                                )
                                        }
                                    </Stack>

                                </Box>


                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
        </ShopLayout >
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id = '' } = ctx.query

    const session: any = await getSession({ req: ctx.req })

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    };

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage