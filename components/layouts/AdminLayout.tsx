import { FC, ReactNode } from "react"

import { SideMenu } from "../ui";

import { AdminNavbar } from "../admin";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {
    children: ReactNode;
    title: string;
    subTitle: string;
    icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
    return (
        <>
            <nav>
                <AdminNavbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0 30px',
            }}
            >
                <Stack>
                    <Typography variant='h1' component='h1'>
                        {icon}
                        {' '}{title}
                    </Typography>
                    <Typography variant='h2'>
                        {subTitle}
                    </Typography>
                </Stack>

                <Box className="fadeIn">
                    {children}
                </Box>
            </main>
        </>
    )
}
