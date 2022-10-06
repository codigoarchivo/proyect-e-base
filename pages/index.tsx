import type { NextPage, GetServerSideProps } from 'next'

import { ShopLayout } from '../components/layouts'

import Typography from '@mui/material/Typography'

import { ProductList } from '../components/products';

import { useProducts } from '../hooks';

import { FullScreenLoading } from '../components/ui';

import { dbProducts } from '../database';

import { IProduct } from '../interfaces';

interface Props {
  products: IProduct[]
}


const HomePage: NextPage<Props> = ({ products }) => {

  // const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de teslo aqui'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
      {/* {
        isLoading
          ? <FullScreenLoading />
          : 
      } */}

      <ProductList products={products} />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, must-revalidate"
  );
  
  const products = await dbProducts.getAllProducts();

  return {
    props: {
      products,
    }
  }
}

export default HomePage
