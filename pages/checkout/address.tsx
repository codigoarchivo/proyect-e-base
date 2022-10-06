import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

import { ShopLayout } from '../../components/layouts/ShopLayout';

const AddressPage = () => {
  return (
    <ShopLayout title={'Dirección'} pageDescription={'Confirmar dirección de destino'}>
      <Typography variant='h1' component='h1'>Dirección</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Nombre'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Apellido'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Dirección'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Dirección 2'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Codigo Postal'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Ciudad'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Codigo Postal'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Ciudad'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant='filled' label='Pais' value={1}>
              <MenuItem value={1}>Costa Rica</MenuItem>
              <MenuItem value={2}>Honduras</MenuItem>
              <MenuItem value={3}>El Salvador</MenuItem>
              <MenuItem value={4}>México</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={'Teléfono'}
            variant={'filled'}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }} display='flex' justifyContent={'center'}>
        <Button color='secondary' className='circular-btn' size='large'>Revisar Pedido</Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage