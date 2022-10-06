import React from 'react'

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

export const FullScreenLoading = () => {
    return (
        <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} justifyContent={'center'} alignItems={'center'} height={'calc(100vh - 200px)'}>
            <Typography mb={3}>Cargando...</Typography>
            <CircularProgress thickness={2} />
        </Box>
    )
}
