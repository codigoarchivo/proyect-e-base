import NextLink from 'next/link'

import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import Link from '@mui/material/Link';

import Chip from '@mui/material/Chip';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts/ShopLayout';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre completo', width: 300 },
    {
        field: 'paid', headerName: 'Pagada', description: 'Muestra información si esta pagada la orden o no', width: 200,
        renderCell: (params) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )
        }
    },
    {
        field: 'Orden', headerName: 'Ver orden', width: 200, sortable: false,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
        }
    },
];

const rows = [
    { id: 1, paid: true, fullname: 'Jackson Quintero' },
    { id: 2, paid: false, fullname: 'Irene Paredes' },
    { id: 3, paid: true, fullname: 'Daniel Paredes' },
    { id: 4, paid: true, fullname: 'Dulce Quintero' },
]

const HistoryPage = () => {
    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

            <Grid container>
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

export default HistoryPage