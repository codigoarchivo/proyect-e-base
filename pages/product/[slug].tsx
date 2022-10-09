import { useState, useContext } from 'react';

import { useRouter } from 'next/router';

import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { ShopLayout } from '../../components/layouts';

import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';

import Chip from '@mui/material/Chip';

import { ProductSlideShow, SizeSelector } from '../../components/products';

import { ItemCounter } from '../../components/ui';

import { dbProducts } from '../../database';

import { ICartProduct, IProduct, ISize } from '../../interfaces';

import { CartContext } from '../../context';

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();

  const { addProductToCart } = useContext(CartContext)

  const [temCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 5,
  });


  const onAddProduct = () => {
    if (!temCartProduct.size) { return; };

    addProductToCart(temCartProduct);

    router.push('/cart');
  };

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }));
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7} >
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5} >
          <Typography variant={'h1'} component={'h1'}>{product.title}</Typography>
          <Typography variant={'subtitle1'} component={'h2'}>${' '}{product.price}</Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant={'subtitle2'}>Cantidad</Typography>

            {/* count */}
            <ItemCounter
              currentValue={temCartProduct.quantity}
              updateQuantity={onUpdateQuantity}
              maxValue={product.inStock > 10 ? 10 : product.inStock}
            />

            {/* size */}
            <SizeSelector
              sizes={product.sizes}
              selectedSize={temCartProduct.size}
              onSelectedSize={selectedSize}
            />
          </Box>


          {
            (product.inStock > 0)
              ?
              (
                <Button onClick={onAddProduct} sx={{ width: '-webkit-fill-available' }} color={'secondary'} className={'circular-btn'}>
                  {
                    temCartProduct.size
                      ? 'Agregar al carrito'
                      : 'Seleccione una talla'
                  }
                </Button>
              )
              : (
                <Chip sx={{ width: '-webkit-fill-available' }} label='No hay disponibles' color={'error'} variant={'outlined'}></Chip>
              )
          }

          <Box sx={{ mt: 3 }}>
            <Typography variant={'subtitle2'}>Description</Typography>
            <Typography variant={'body2'}>{product.description}</Typography>
          </Box>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}



export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const slugs = await dbProducts.getAllProductSlugs();

  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: "blocking"
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as { slug: string }

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  }
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//   const { slug } = ctx.params as { slug: string }

//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       product,
//     }
//   }
// }


export default ProductPage