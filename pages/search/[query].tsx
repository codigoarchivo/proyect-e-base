import type { NextPage, GetServerSideProps } from 'next';

import { ShopLayout } from '../../components/layouts';

import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';

import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';

import { IProduct } from '../../interfaces';


interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
    return (
        <ShopLayout title={'Teslo-Shop - Serch'} pageDescription={'Encuentra los mejores productos de teslo aqui'}>
            <Typography variant='h1' component='h1'>Tienda</Typography>

            {
                foundProducts
                    ? <Typography variant='h2' sx={{ mb: 1 }} textTransform={'capitalize'}>{query}</Typography>
                    : (
                        <Stack flexDirection={'row'}>
                            <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningun producto</Typography>
                            <Typography variant='h2' sx={{ ml: 1 }} color={'secondary'} textTransform={'capitalize'}>{query}</Typography>
                        </Stack>
                    )
            }


            <ProductList products={products} />

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { query = '' } = ctx.params as { query: string }

    if (query.trim().length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }

    let products = await dbProducts.getProductByTerm(query);

    const foundProducts = products.length > 0;

    if (!foundProducts) {
        // products = await dbProducts.getAllProducts();
        products = await dbProducts.getProductByTerm('plaid');
    };

    return {
        props: {
            products,
            foundProducts,
            query,
        }
    }
}

export default SearchPage
