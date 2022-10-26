import React from 'react';
import { NextPage } from 'next';
import DashBoardOutlined from '@mui/icons-material/DashboardOutlined';
import Grid from '@mui/material/Grid';
import { AdminLayout } from '../../components/layouts';
import { SumaryTile } from '../../components/admin';
import { AttachMoneyOutlined, CreditCardOffOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';

const DashBoardPage: NextPage = () => {
    return (
        <AdminLayout title={'DashBoard'} subTitle={'Estadiaticas Generales'} icon={<DashBoardOutlined />}>
            <Grid container spacing={2}>

                <SumaryTile
                    title={5}
                    subTitle={'Ordenes totales'}
                    icon={<CreditCardOffOutlined
                        color='secondary'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={55}
                    subTitle={'Ordenes pagadas'}
                    icon={<AttachMoneyOutlined
                        color='success'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={53}
                    subTitle={'Ordenes pendientes'}
                    icon={<CreditCardOffOutlined
                        color='error'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={10}
                    subTitle={'Clientes'}
                    icon={<GroupOutlined
                        color='primary'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={3}
                    subTitle={'Productos'}
                    icon={<CategoryOutlined
                        color='warning'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={1}
                    subTitle={'Sin Existencia'}
                    icon={<CancelPresentationOutlined
                        color='error'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={62}
                    subTitle={'Bajo Inventario'}
                    icon={<ProductionQuantityLimitsOutlined
                        color='warning'
                        sx={{ fontSize: 40 }}
                    />}
                />
                <SumaryTile
                    title={62}
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