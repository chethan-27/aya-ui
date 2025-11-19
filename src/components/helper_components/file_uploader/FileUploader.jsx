import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Alert,
    Snackbar,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseURL";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

const FileUploader = ({ onFilesUploaded }) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileTitle, setFileTitle] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const inputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            alert("File size exceeds 100MB limit!");
            return;
        }

        setSelectedFile(file);
        setOpen(true);
    };

    const handleUpload = async () => {

        let title = fileTitle || selectedFile.name.split(".")[0];
        if (!selectedFile || !title.trim()) return;

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("title", title);

            console.log(formData);
            const { data } = await axios.post(
                `${BASE_URL}/api/s3/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            onFilesUploaded([data]);
            setOpen(false);
            setSelectedFile(null);
            setFileTitle("");
        } catch (err) {
            console.log("Error in files upload", err);
            setSnackbar({ open: true, message: 'File upload failed', severity: 'error' });
        }
    };

    const renderSnackbar = () => {
        return snackbar?.open && (
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
        );
    }

    return (
        <Box>
            <Button variant="outlined" component="label">
                Upload File
                <input ref={inputRef} type="file" hidden onChange={handleFileSelect} />
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Name Your File</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        File: {selectedFile?.name} (
                        {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB)
                    </Typography>
                    <TextField
                        label="File Title"
                        fullWidth
                        value={fileTitle}
                        onChange={(e) => setFileTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            inputRef.current.value = null;
                        }}
                    >
                        Close
                    </Button>
                    <Button onClick={handleUpload} variant="contained">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
            {renderSnackbar()}
        </Box>
    );
};

export default FileUploader;
