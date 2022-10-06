import type { NextPage } from 'next'

import Typography from '@mui/material/Typography'

import { ShopLayout } from '../../components/layouts'

import { ProductList } from '../../components/products';

import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';


const MenPage: NextPage = () => {

    const { products, isLoading } = useProducts(`/products?gender=Men`);

    return (
        <ShopLayout title={'Teslo-Shop - Mens'} pageDescription={'Encuentra los mejores productos de teslo para Hombres'}>
            <Typography variant='h1' component='h1'>Hombres</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Productos para niños</Typography>
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default MenPage;
