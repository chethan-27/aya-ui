import { Modal as MuiModal, Box, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import BlogForm from '../../primary_components/blog_form/BlogForm';

const Modal = ({ blog, open, onClose }) => {
    useEffect(() => {
        console.log(blog);
    }, [blog]);
    return (
        <MuiModal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Box sx={modalStyle}>
                <Box sx={headerStyle}>
                    <Typography variant="h6">Add New Blog</Typography>
                </Box>

                <Box sx={bodyStyle}>
                    <BlogForm />
                </Box>

                <Box sx={footerStyle}>
                    <Button onClick={onClose} variant="contained" color="primary">
                        Close
                    </Button>
                </Box>
            </Box>
        </MuiModal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80vh',
    '@media (max-width: 600px)': {
        width: '60vw',
        height: '60vh',
    },
};

const headerStyle = {
    borderBottom: '1px solid #ccc',
    paddingBottom: '8px',
};

const bodyStyle = {
    paddingTop: '16px',
    paddingBottom: '16px',
    height: '100%',
    width: "100%"
};

const footerStyle = {
    borderTop: '1px solid #ccc',
    paddingTop: '8px',
    display: 'flex',
    justifyContent: 'flex-end',
};

export default Modal;