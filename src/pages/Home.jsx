import { useEffect, useState } from 'react';
import { BlogCard, Footer, Hero, Modal } from '../components';
import { BASE_URL } from '../utils/baseURL';
import axios from 'axios';
import { postData } from '../utils/data';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const Home = () => {

    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [modal, setModal] = useState({ oprn: false });

    const dataInit = async () => {
        try {
            // let data = postData;
            let { data = [] } = await axios.get(`${BASE_URL}/api/posts`);
            console.log(30, data);
            data = data.slice(0, 3);
            setBlogs(data);
        } catch (err) {
            console.error(err);
        }
    }

    const renderModal = () => {
        return (
            <Modal onClose={() => setModal({ open: false })} {...modal} />
        )
    }
    const renderPosts = () => {
        return (
            <section className="home-page-blogs-div">
                <Grid container spacing={2}>
                    {blogs.map((blog) => (
                        <BlogCard blog={blog} setModal={setModal} />
                    ))}
                </Grid>
                <Button variant="outlined" size="large" sx={styles.button} onClick={() => navigate('/blogs')}>
                    View All Stories
                </Button>
            </section>

        );
    }
    useEffect(() => {
        dataInit();
    }, []);

    return (
        <>
            <Hero />
            {renderPosts()}
            <Footer />
            {modal?.open && renderModal()}
        </>
    );
};


export default Home;