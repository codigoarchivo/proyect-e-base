import { NextPage } from 'next'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, MenuItem, Select } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import useSWR from 'swr'
import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces'


const OrdersPage: NextPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) return <></>;

    const rows = data!.map((order) => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt
    }));

    const columns: GridColDef[] | any = [
        { field: 'id', headerName: 'Order ID', width: 250 },
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre Completo', width: 300 },
        { field: 'total', headerName: 'Monto total', width: 300 },
        {
            field: 'isPaid',
            headerName: 'Pagada',
            width: 300,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.isPaid
                    ? (<Chip variant='outlined' label='Pagada' color='success' />)
                    : (<Chip variant='outlined' label='pendiente' color='error' />);
            }
        },
        { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 130 },
        {
            field: 'check',
            headerName: 'Ver Orden',
            width: 300,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <a href={`/admin/orders/${row.id}`} target='_black'>
                        Ver Orden
                    </a>
                )
            }
        },
        { field: 'createdAt', headerName: 'Creado en', width: 300 },
    ];

    return (
        <AdminLayout
            title={'Ordenes'}
            subTitle={'Mantenimiento de ordenes'}
            icon={<ConfirmationNumberOutlined />}
        >
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
        </AdminLayout>
    )
}

export default OrdersPage