import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import  AddCircleOutline  from "@mui/icons-material/AddCircleOutline";
import  RemoveCircleOutline  from "@mui/icons-material/RemoveCircleOutline";

export const ItemCounter = () => {
    return (
        <Box display='flex' alignItems='center'>
            <IconButton>
                <RemoveCircleOutline/>
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>
                1
            </Typography>
            <IconButton>
                <AddCircleOutline/>
            </IconButton>
        </Box>
    )
}
