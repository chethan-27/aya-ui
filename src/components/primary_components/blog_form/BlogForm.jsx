// BlogForm.jsx
import { useEffect } from "react";
import { Box, Button, TextField, IconButton } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { FileUploader } from "../../";
import { BASE_URL } from "../../../utils/baseURL";
import DeleteIcon from "@mui/icons-material/Delete";

const BlogForm = ({ onSubmit, onClose }) => {
    const { control, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: { title: "", description: "", files: [] },
    });

    const files = watch("files");

    const handleDeleteFile = async (fileKey) => {
        try {
            await axios.delete(`${BASE_URL}/api/s3/delete`, {
                data: { key: fileKey },
            });
            setValue("files", files.filter((f) => f.key !== fileKey));
        } catch (err) {
            console.error("Error deleting file:", err);
        }
    };

    const handleEditFileTitle = (fileKey, newTitle) => {
        const updated = files.map((f) =>
            f.key === fileKey ? { ...f, title: newTitle } : f
        );
        setValue("files", updated);
    };

    const handleFormClose = async () => {
        if (files?.length > 0) {
            const confirmClose = window.confirm(
                "You have unsaved files. They will be deleted. Continue?"
            );
            if (!confirmClose) return;

            for (const f of files) {
                try {
                    await axios.delete(`${BASE_URL}/api/s3/delete`, {
                        data: { key: f.key },
                    });
                } catch { }
            }
        }
        reset();
        if (onClose) onClose();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            {/* Title */}
            <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Title"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            {/* Description */}
            <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Description"
                        multiline
                        rows={4}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <FileUploader
                onFilesUploaded={(uploadedFiles) =>
                    setValue("files", [...files, ...uploadedFiles])
                }
            />

            {/* Uploaded Files with Edit/Delete */}
            {files?.length > 0 && (
                <Box sx={{ mt: 1 }}>
                    <strong>Uploaded Files:</strong>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {files.map((f) => (
                            <li key={f.key} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                                <TextField
                                    value={f.title}
                                    size="small"
                                    onChange={(e) => handleEditFileTitle(f.key, e.target.value)}
                                    sx={{ flex: 1 }}
                                />
                                <span>({(f.size / (1024 * 1024)).toFixed(2)} MB)</span>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteFile(f.key)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained">
                    Save
                </Button>
                <Button onClick={handleFormClose} color="error">
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default BlogForm;