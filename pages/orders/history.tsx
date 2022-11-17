import NextLink from 'next/link'

import { GetServerSideProps, NextPage } from 'next'

import { getSession } from 'next-auth/react';

import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import Link from '@mui/material/Link';

import Chip from '@mui/material/Chip';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts/ShopLayout';

import { dbOrders } from '../../database';

import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre completo', width: 300 },
    {
        field: 'isPaid', headerName: 'Pagada', description: 'Muestra información si esta pagada la orden o no', width: 200,
        renderCell: (params) => {
            return (
                params.row.isPaid
                    ? <Chip color='success' label='pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )
        }
    },
    {
        field: 'Orden', headerName: 'Ver orden', width: 200, sortable: false,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
        }
    },
];


interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map((order, idx) => ({
        id: idx + 1,
        isPaid: order.isPaid,
        fullname: order.shippingAddress.firstName + '  ' + order.shippingAddress.lastName,
        orderId: order._id
    }));

    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session: any = await getSession({ req: ctx.req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    };

    const orders = await dbOrders.getOrdersByUser(session.user._id);

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage