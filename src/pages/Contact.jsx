import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';


const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message submitted!');
    };


    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant='h4' gutterBottom>Contact Us</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                    <TextField label='Name' name='name' value={form.name} onChange={handleChange} required />
                    <TextField label='Email' name='email' value={form.email} onChange={handleChange} required type='email' />
                    <TextField label='Message' name='message' value={form.message} onChange={handleChange} required multiline rows={4} />
                    <Button type='submit' variant='contained'>Send</Button>
                </form>
            </Box>
        </Container>
    );
};


export default Contact;