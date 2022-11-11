import { FC, useContext } from 'react';

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import { CartContext } from '../../context';

import { currency } from '../../utils';

interface Props {
    orderValues: {
        numberOfItems: number;
        subTotal: number;
        total: number;
        tax: number;
    }
}

export const OrderSumary: FC<Props> = ({ orderValues }) => {

    const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

    const sumaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, tax }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>

            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{sumaryValues.numberOfItems} {sumaryValues.numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(sumaryValues.subTotal)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Inpuesto {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(sumaryValues.tax)}</Typography>
            </Grid>
            <Grid item xs={6} mt={5}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item mt={5} xs={6} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>{currency.format(sumaryValues.total)}</Typography>
            </Grid>
        </Grid>
    )
}
