import { useContext } from 'react';

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import { CartContext } from '../../context';

import { currency } from '../../utils';

export const OrderSumary = () => {

    const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>

            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(subTotal)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Inpuesto {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(tax)}</Typography>
            </Grid>
            <Grid item xs={6} mt={5}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item mt={5} xs={6} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>{currency.format(total)}</Typography>
            </Grid>
        </Grid>
    )
}
