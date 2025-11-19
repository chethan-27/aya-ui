import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { BASE_URL } from '../utils/baseURL';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: { name: '', email: '', password: '' }
    });

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/users`);
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) fetchUsers();
    }, [user]);

    const handleOpenDialog = (u = null) => {
        setEditUser(u);
        reset(u ? { name: u.name, email: u.email, password: '' } : { name: '', email: '', password: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditUser(null);
    };

    const onSubmit = async (data) => {
        try {
            if (editUser) {
                await axios.put(`${BASE_URL}/api/users/${editUser._id}`, data);
            } else {
                await axios.post(`${BASE_URL}/api/users`, data);
            }
            fetchUsers();
            handleCloseDialog();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${BASE_URL}/users/${id}`);
                fetchUsers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: '_id', headerName: 'Actions', width: 200, renderCell: (params) => (
                <>
                    <Button variant='contained' size='small' onClick={() => handleOpenDialog(params.row)}>Edit</Button>
                    <Button variant='outlined' color='error' size='small' onClick={() => handleDelete(params.row._id)} style={{ marginLeft: 8 }}>Delete</Button>
                </>
            )
        }
    ];

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant='h4' gutterBottom>Profile & User Management</Typography>
                <Button variant='contained' onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>Add User</Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={users} getRowId={(row) => row._id} columns={columns} pageSize={5} rowsPerPageOptions={[5]} isRowSelectable={() => false} />
                </div>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState }) => (
                                <TextField {...field} label="Name" error={!!fieldState.error} helperText={fieldState.error?.message} />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: 'Email is required' }}
                            render={({ field, fieldState }) => (
                                <TextField {...field} label="Email" error={!!fieldState.error} helperText={fieldState.error?.message} />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Password" type="password" />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSubmit(onSubmit)}>{editUser ? 'Update' : 'Add'}</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default Profile;
