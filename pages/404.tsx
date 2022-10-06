import { ShopLayout } from '../components/layouts/ShopLayout';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';


const Custom404 = () => {
    return (
        <ShopLayout title={'Page not found'} pageDescription={'No hay nada que mostrar aqui'}>
            <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} justifyContent={'center'} alignItems={'center'} height={'calc(100vh - 200px)'}>
                <Typography variant='h1' component={'h1'} fontSize={80} fontWeight={200}>404 |</Typography>
                <Typography marginLeft={2} >No encontramos ninguna página aqui</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404