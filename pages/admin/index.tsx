import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { NextPage } from 'next';
import DashBoardOutlined from '@mui/icons-material/DashboardOutlined';
import Grid from '@mui/material/Grid';
import { AdminLayout } from '../../components/layouts';
import { SumaryTile } from '../../components/admin';
import { AttachMoneyOutlined, CreditCardOffOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { DashBoardSumaryResponse } from '../../interfaces';
import { Typography } from '@mui/material';

const DashBoardPage: NextPage = () => {

    const { data, error } = useSWR<DashBoardSumaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 //30s
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => setRefreshIn((refreshIn) => refreshIn > 0 ? refreshIn - 1 : 30), 1000)

        return () => clearInterval(interval);
    }, [])


    if (!error && !data) {
        return <></>
    }

    if (error) {
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    } = data!;

    return (
        <AdminLayout title={'DashBoard'} subTitle={'Estadiaticas Generales'} icon={<DashBoardOutlined />}>
            <Grid container spacing={2}>

                <SumaryTile
                    title={numberOfOrders}
                    subTitle={'Ordenes totales'}
                    icon={<CreditCardOffOutlined
                        color='secondary'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={paidOrders}
                    subTitle={'Ordenes pagadas'}
                    icon={<AttachMoneyOutlined
                        color='success'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={notPaidOrders}
                    subTitle={'Ordenes pendientes'}
                    icon={<CreditCardOffOutlined
                        color='error'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={numberOfClients}
                    subTitle={'Clientes'}
                    icon={<GroupOutlined
                        color='primary'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={numberOfProducts}
                    subTitle={'Productos'}
                    icon={<CategoryOutlined
                        color='warning'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={productsWithNoInventory}
                    subTitle={'Sin Existencia'}
                    icon={<CancelPresentationOutlined
                        color='error'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={lowInventory}
                    subTitle={'Bajo Inventario'}
                    icon={<ProductionQuantityLimitsOutlined
                        color='warning'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={refreshIn}
                    subTitle={'Actualización en:'}
                    icon={<AccessTimeOutlined
                        color='secondary'
                        sx={{ fontSize: 40 }}
                    />}
                />

            </Grid>
        </AdminLayout>
    )
}

export default DashBoardPage