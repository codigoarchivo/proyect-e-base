import { useState, useContext } from 'react';

import NextLink from 'next/link';

import { useRouter } from 'next/router';

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import Chip from '@mui/material/Chip';

import ErrorOutline from '@mui/icons-material/ErrorOutline';

import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context';

import { AuthLayout } from "../../components/layouts";

import { validations } from '../../utils';

import { tesloApi } from '../../api';



type FormData = {
    email: string,
    password: string,
};

const loginPage = () => {

    const { replace } = useRouter();

    const { loginUser } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false);

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);
        const isValidLogin = await loginUser(email, password);

        if (!isValidLogin) {
            setShowError(true);
            setTimeout(() => { setShowError(false) }, 3000);
            return;
        };

        replace('/');
    };

    return (
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>

                            <Chip
                                label='No reconocemos ese usuario / contraseña'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='username'
                                label='Correo'
                                type='email'
                                variant='filled'
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail,
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='current-password'
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type={'submit'}
                                color='secondary'
                                className='circular-btn'
                                size='large'
                                fullWidth>
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
            </form>
        </AuthLayout>
    )
}
export default loginPage;