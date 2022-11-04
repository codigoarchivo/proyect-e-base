import { GetServerSideProps, NextPage } from 'next';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';

import Chip from '@mui/material/Chip';

import { AirplaneTicketOutlined } from '@mui/icons-material';

import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';

import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';

import { AdminLayout } from '../../../components/layouts';

import { CardList, OrderSumary } from '../../../components/cart';

import { dbOrders } from '../../../database';

import { IOrder } from '../../../interfaces';

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    // const { back, reload } = useRouter();

    const { shippingAddress } = order

    return (
        <AdminLayout
            title={`Resumen de la Orden`}
            subTitle={`OrdenId: ${order._id}`}
            icon={<AirplaneTicketOutlined />}
        >

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
                                <Typography sx={{ cursor: 'pointer' }} variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'Productos' : 'Producto'})</Typography>

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
                                        flexDirection='column'
                                        flex={1}
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
                                                    <Chip
                                                        sx={{ my: 2 }}
                                                        label='Pendiente de pago'
                                                        variant='outlined'
                                                        color='error'
                                                        icon={<CreditCardOffOutlined />}
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
        </AdminLayout >
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id = '' } = ctx.query

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false,
            }
        }
    };

    return {
        props: {
            order
        }
    }
}

export default OrderPage