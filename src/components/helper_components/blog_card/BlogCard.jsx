import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Badge } from "../../";
import "./styles.css";
import moment from 'moment-timezone';

const styles = {
    card: {
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
    },
    cardMedia: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    footerdiv: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: "50%",
    }
};

const BlogCard = ({
    blog = {},
    setModal = () => { }
}) => {
    let date;
    if (blog.date) {
        date = moment(blog.date).tz('Asia/Kolkata').format('MMM D, YYYY');
    }

    const handleOpenModal = (event) => {
        event.stopPropagation();
        setModal({ open: true, blog });
    }
    return (
        <Grid item xs={12} sm={6} md={4} key={blog._id || blog.title}>
            <Card sx={styles.card}>
                {blog.img && (
                    <CardMedia
                        component="img"
                        height="200"
                        image={blog.img}
                        alt={blog.title}
                        sx={styles.cardMedia}
                    />
                )}

                <CardContent>
                    <Badge variant="secondary" className="custom-accent-badge">
                        {blog.type}
                    </Badge>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {blog.description}
                    </Typography>
                    <div style={styles.footerdiv}>
                        <Typography variant="body2" display="block" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <CalendarTodayOutlinedIcon fontSize="small" sx={{ width: 16, height: 16, mr: 1 }} />
                            {date}
                        </Typography>
                        <IconButton onClick={handleOpenModal}>
                            <ChevronRightIcon />
                        </IconButton>
                    </div>

                    {/* {blog.files && blog.files.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                            {blog.files.map((file, idx) => (
                                <Button
                                    key={idx}
                                    size="small"
                                    href={file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View File {idx + 1}
                                </Button>
                            ))}
                        </Box>
                    )} */}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default BlogCard;