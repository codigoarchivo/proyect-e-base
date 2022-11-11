import { FC, useMemo, useState } from 'react';

import NextLink from 'next/link';

import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';

import Box from '@mui/material/Box';

import CardActionArea from '@mui/material/CardActionArea';

import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';

import Chip from '@mui/material/Chip';

import { IProduct } from '../../interfaces';

interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);

    const [isImageloaded, setIsImageloaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
            ? product.images[1]
            : product.images[0];
    }
        , [isHovered, product.images])

    return (
        <Grid
            item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            {
                                (product.inStock === 0) && (
                                    <Chip
                                        color='primary'
                                        label='No hay disponible'
                                        sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                                    />
                                )
                            }
                            <CardMedia
                                className={'fadeIn'}
                                component={'img'}
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setIsImageloaded(true)}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Box sx={{ mt: 1, display: isImageloaded ? 'block' : 'none' }} className={'fadeIn'}>
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>${' '}{product.price}</Typography>
            </Box>
        </Grid>
    )
}
