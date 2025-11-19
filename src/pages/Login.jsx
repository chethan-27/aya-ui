import { useState, useContext } from 'react';
import { Container, Typography, Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { BASE_URL } from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/login`, form);
            login(res.data);
            setSnackbar({ open: true, message: 'Login successful', severity: 'success' });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: 'Login failed', severity: 'error' });
        }
    };


    return (
        <Container>
            <Box sx={{ mt: 4, maxWidth: '400px' }}>
                <Typography variant='h4' gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <TextField label='Email' name='email' value={form.email} onChange={handleChange} required />
                    <TextField label='Password' name='password' type='password' value={form.password} onChange={handleChange} required />
                    <Button type='submit' variant='contained'>Login</Button>
                </form>
            </Box>
            {
                snackbar?.open && (
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbar.open} autoHideDuration={6000} onClose={() => { setSnackbar({ open: false }) }}>
                        <Alert
                            onClose={() => { setSnackbar({ open: false }) }}
                            severity={snackbar.severity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {snackbar?.message}
                        </Alert>
                    </Snackbar>
                )
            }
        </Container>
    );
};


export default Login;