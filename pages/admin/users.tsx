import { useState, useEffect } from 'react';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AdminLayout } from '../../components/layouts';

const UsersPage = () => {
    const { data, error } = useSWR<IUser[]>('/api/admin/users');

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data])


    if (!data && !error) return <></>;

    const onRoleUpdate = async (userId: string, newRole: string) => {

        const previosUsers = users.map((user) => ({...user}));

        const updateUsers = users.map((user) => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }))

        setUsers(updateUsers);
        try {
            await tesloApi.put('/admin/users', {
                userId,
                role: newRole
            })
        } catch (error) {
            setUsers(previosUsers);
            console.log(error);
            alert('No se pudo actualizar el rol del usuario')
        }
    };

    const columns: GridColDef[] | any = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        {
            field: 'role',
            headerName: 'Rol',
            width: 300,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Select
                        value={row.role}
                        label='Rol'
                        onChange={({ target }) => onRoleUpdate(row.id, target.value)}
                        sx={{ width: '300px' }}
                    >

                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                        <MenuItem value='super-user'>Super User</MenuItem>
                        <MenuItem value='seo'>Seo</MenuItem>

                    </Select>
                );
            }
        },
    ];

    const rows = users.map((user: any) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }));

    return (
        <AdminLayout
            title={'Usuario'}
            subTitle={'Mantenimiento de usuarios'}
            icon={<PeopleOutline />}
        >

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>

            </Grid>

        </AdminLayout>
    )
}

export default UsersPage