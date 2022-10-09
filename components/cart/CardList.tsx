import { FC, useContext } from 'react';

import NextLink from 'next/link';

import Grid from '@mui/material/Grid';

import CardActionArea from '@mui/material/CardActionArea';

import Link from '@mui/material/Link';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import CardMedia from '@mui/material/CardMedia';

import Button from '@mui/material/Button';

import { ItemCounter } from '../ui';

import { CartContext } from '../../context';

import { ICartProduct } from '../../interfaces';


interface Props {
    editable?: boolean,
}

export const CardList: FC<Props> = ({ editable = false }, key) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

    const onNewQuantityValue = (product: ICartProduct, onNewQuantityValue: number) => {
        product.quantity = onNewQuantityValue;
        updateCartQuantity(product)
    };

    return (
        <>
            {
                cart.map(product => (
                    <Grid container key={product.slug + product.size} >
                        <Grid item xs={3}>
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.images}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla <strong>{product.size}</strong></Typography    >
                                {
                                    editable
                                        ? (
                                            <ItemCounter
                                                currentValue={product.quantity}
                                                maxValue={10}
                                                updateQuantity={(value) => onNewQuantityValue(product, value)}
                                            />
                                        )
                                        : <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>${' '}{product.price}</Typography>
                            {
                                editable && <Button onClick={() => removeCartProduct(product)} variant='text' color='secondary'>Remover</Button>
                            }

                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
