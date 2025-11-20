import { useEffect, useState } from 'react';
import { BlogCard, Footer, Hero } from '../components';
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DownloadIcon from "@mui/icons-material/Download";
// import { BASE_URL } from '../utils/baseURL';
// import axios from 'axios';
import { Box, Button, Grid, IconButton, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PostCard } from './BlogsFromBrochure';

const styles = {
    button: {
        borderColor: 'primary.main',
        color: 'primary.main',
        borderRadius: "12px",
        '&:hover': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
        },
    }
};

const blogs = [
    {
        id: "sports-events",
        title: "Sports Events & Tournaments",
        summary:
            "Volleyball, cricket and athletics events to encourage fitness and togetherness; winners were honored.",
        content:
            `The youth of Amadagur organized various sports events, including volleyball and cricket tournaments, along with athletics competitions, to promote physical fitness and unity among the villagers. Winners of the games were honored for their achievements, encouraging sportsmanship and active participation. These activities not only provided good mental refreshment but also strengthened the bond and spirit of togetherness within the community.`,
        images: [
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/APL-1.jpg",
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/APL-2.jpg",
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/APL-3.jpg",
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/APL-4.jpg",
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/volleyball_1.jpg"
        ],
    }
];

const Home = () => {

    const navigate = useNavigate();

    // const [blogs, setBlogs] = useState([]);
    const [modal, setModal] = useState({ oprn: false });

    // const dataInit = async () => {
    //     try {
    //         // let data = postData;
    //         let { data = [] } = await axios.get(`${BASE_URL}/api/posts`);
    //         console.log(30, data);
    //         data = data.slice(0, 3);
    //         setBlogs(data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    const renderModal = () => {
        return (
            <FullPostModal {...modal} onClose={() => setModal({ open: false })} />
        )
    }
    const renderPosts = () => {
        return (
            <section className="home-page-blogs-div">
                <Grid container spacing={2}>
                    {blogs.map((blog) => (
                        <PostCard post={blog} key={blog._id} onView={() => setModal({ open: true, post: blog })} />
                    ))}
                </Grid>
                <Button variant="outlined" size="large" sx={styles.button} onClick={() => navigate('/blogs')}>
                    View All Stories
                </Button>
            </section>

        );
    }
    // useEffect(() => {
    //     dataInit();
    // }, []);

    return (
        <>
            <Hero />
            {renderPosts()}
            <Footer />
            {modal?.open && renderModal()}
        </>
    );
};

const FullPostModal = ({ open, onClose, post, onOpenImage }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "95%", sm: 700 },
                    maxHeight: "90vh",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6">{post?.title}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {post?.content}
                </Typography>

                {post?.images && post.images.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2">Images</Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                            {post.images.map((url, i) => (
                                <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Box
                                        component="img"
                                        src={url}
                                        alt={`${post.title} ${i}`}
                                        sx={{
                                            width: { xs: 140, sm: 160 },
                                            height: { xs: 90, sm: 100 },
                                            objectFit: "cover",
                                            borderRadius: 1,
                                            cursor: "pointer",
                                        }}
                                        onClick={() => onOpenImage(url)}
                                    />
                                    <Box sx={{ mt: 0.5 }}>
                                        <Button
                                            size="small"
                                            component="a"
                                            href={url}
                                            target="_blank"
                                            rel="noreferrer"
                                            download
                                            startIcon={<DownloadIcon />}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};
export default Home;