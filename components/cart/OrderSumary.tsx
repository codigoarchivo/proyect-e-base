import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

export const OrderSumary = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>

            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>${' '}{255.36}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Inpuesto 15%</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>${' '}{35.36}</Typography>
            </Grid>
            <Grid item xs={6} mt={5}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item mt={5} xs={6} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>${' '}{186.36}</Typography>
            </Grid>
        </Grid>
    )
}
