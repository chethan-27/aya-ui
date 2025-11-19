import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Box, Typography, Button, Grid } from "@mui/material";
import { BASE_URL } from "../utils/baseURL";
import { BlogCard, Modal } from "../components";
import _ from "lodash";
import { AuthContext } from "../contexts/AuthContext";

const Blogs = () => {

    const { user } = useContext(AuthContext);

    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [modal, setModal] = useState({ oprn: false });

    const initialRender = useRef(true);

    const fetchBlogCount = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/posts/count`);
            const count = res.data.count || 0;
            setTotalBlogs(count);
            if (count && count === 0) {
                setLoading(false);
            }
            return count;
        } catch (err) {
            console.error("Error fetching blog count:", err);
        }
    };

    const fetchBlogs = async (pageNo = 1) => {
        try {
            let count = totalBlogs;
            if (initialRender.current) {
                initialRender.current = false;
                count = await fetchBlogCount();
            }
            const res = await axios.get(`${BASE_URL}/api/posts?page=${pageNo}&limit=10`);
            const newBlogs = res.data?.posts || res.data;

            if (!_.isEmpty(newBlogs)) {
                setBlogs((prev) => [...prev, ...newBlogs]);
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    const renderModal = () => {
        return (
            <Modal onClose={() => setModal({ open: false })} {...modal} />
        )
    }

    useEffect(() => {
        console.log("Effect");
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (totalBlogs > 0) {
            setHasMore(blogs.length < totalBlogs);
        }
    }, [blogs, totalBlogs]);

    return (
        <Box sx={{ width: "100%", height: "80vh", display: "flex", flexDirection: "column" }}>
            {
                user && (
                    <Box
                        sx={{
                            flexShrink: 0,
                            p: 2,
                            borderBottom: "1px solid #eee",
                            display: "flex",
                            justifyContent: "flex-end",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "#fff",
                            zIndex: 10,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setModal({ open: true })}
                        >
                            + Add New
                        </Button>
                    </Box>
                )
            }

            <Box
                id="scrollableDiv"
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 2,
                    paddingTop: '16px'
                }}
            >
                <InfiniteScroll
                    dataLength={totalBlogs}
                    next={() => !initialRender && fetchBlogs(page)}
                    hasMore={hasMore}
                    loader={!loading &&
                        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    }
                    endMessage={
                        <Typography align="center" color="textSecondary" sx={{ mt: 2 }}>
                            🎉 You’ve reached the end!
                        </Typography>
                    }
                    scrollableTarget="scrollableDiv"
                >
                    <Grid container spacing={2}>
                        {blogs.map((blog) => (
                            <BlogCard key={blog._id || blog.title} blog={blog} setModal={setModal} />
                        ))}
                    </Grid>
                </InfiniteScroll>

                {loading && blogs.length === 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
            {modal?.open && renderModal()}
        </Box>
    );
};

export default Blogs;
