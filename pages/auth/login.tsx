import NextLink from 'next/link';

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import { AuthLayout } from "../../components/layouts";

const loginPage = () => {
    return (
        <AuthLayout title={"Ingresar"}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Correo'
                            variant='filled'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            variant='filled'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='secondary' className='circular-btn' size='large' fullWidth>
                            ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} textAlign='end'>
                        <NextLink href='/auth/register' passHref>
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}
export default loginPage;