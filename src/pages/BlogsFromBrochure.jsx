import { useContext, useState } from "react";
import {
    Box,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    IconButton,
    Modal,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DownloadIcon from "@mui/icons-material/Download";
import ImageIcon from "@mui/icons-material/Image";
import { AuthContext } from "../contexts/AuthContext";

const postsFromBrochure = [
    {
        id: "road-cleaning",
        title: "Road Cleaning & Awareness Drive",
        summary:
            "Youth organized a road-cleaning and awareness event — cleaned main roads and public areas while spreading messages on hygiene and waste management.",
        content:
            `The youth of Amadagur organized a road-cleaning and awareness event in the village. They cleaned main roads and public areas while spreading messages on hygiene and waste management. Their effort aimed to inspire villagers to keep Amadagur clean and beautiful.`,
        images: [],
    },
    {
        id: "health-camps",
        title: "Health Camps & Blood Donation",
        summary:
            "Health-related activities including blood donation camps and general checkups to promote community well-being.",
        content:
            `The youth of Amadagur organized various health-related activities to spread awareness about the importance of good health. They conducted blood donation camps and general health checkups for villagers, encouraging everyone to take proactive steps toward a healthy lifestyle and community well-being. Their efforts reflect the spirit of service and responsibility among the youth of Amadagur.`,
        images: [],
    },
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
    },
    {
        id: "tree-plantation",
        title: "Tree Plantation & Environment",
        summary:
            "Plantation drives and awareness campaigns to preserve local ecology and encourage villagers to participate.",
        content:
            `The youth of Amadagur organized events focused on protecting and planting trees to preserve the local ecology and environment. Through plantation drives and awareness campaigns, they encouraged villagers to take active part in safeguarding nature. These efforts aim to create a greener, cleaner, and more sustainable environment for future generations.`,
        images: [
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/plantation_2.jpg",
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/plantation-1.jpg",

        ],
    },
    {
        id: "merit-awards",
        title: "Merit Awards & Scholarships",
        summary:
            "Recognizing meritorious students from local schools and providing financial support for higher education.",
        content:
            `The youth of Amadagur believe that change should begin from the roots. To encourage education and recognize talent, they are honoring meritorious students from 11 schools and colleges across the Mandal. Additionally, they are providing financial support to deserving students who wish to pursue higher studies based on merit, helping to nurture a brighter and more educated future for the community.`,
        images: [
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/prize-distribution-1.jpg",
            "https://aya-files.s3.eu-north-1.amazonaws.com/uploads/prize-distribution-2.jpg"
        ],
    },
    {
        id: "national-days",
        title: "Commemorations & Civic Events",
        summary:
            "Events on Republic Day, Independence Day, Gandhi Jayanti, Ambedkar Jayanti, and more to promote patriotism and unity.",
        content:
            `The youth of Amadagur organize events and programs on important days like Republic Day, Independence Day, Gandhi Jayanti, Ambedkar Jayanti, Soldiers’ Amar Divas, and others to promote patriotism and unity among the people. Through these commemorations, they inspire respect for our national heroes (Soldiers and farmers) and values while fostering a sense of togetherness and civic responsibility within the community.`,
        images: [],
    },
    {
        id: "topper-awards",
        title: "Topper Awards (2022-25)",
        summary:
            "Awarding the topper from 11 schools and colleges in Amadagur Mandal for academic years 2022-23, 2023-24 and 2024-25.",
        content:
            `Awarding the topper from 11 schools and colleges in Amadagur Mandal for Academic year 2022-23, 2023-24 and 2024-25.`,
        images: [],
    },
];

const ImageModal = ({ open, src, onClose }) => {
    if (!src) return null;
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "95%", sm: "85%", md: "70%" },
                    maxHeight: "90vh",
                    overflow: "auto",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 1,
                    borderRadius: 1,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                        src={src}
                        alt="preview"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "80vh",
                            objectFit: "contain",
                            borderRadius: 6,
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <Button
                        component="a"
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        download
                        startIcon={<DownloadIcon />}
                        variant="outlined"
                        size="small"
                    >
                        Download / Open
                    </Button>
                </Box>
            </Box>
        </Modal>
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

const BlogsFromBrochureWithImages = () => {
    const { user } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(null);

    const handleView = (post) => {
        setActivePost(post);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setActivePost(null);
    };

    const handleOpenImage = (src) => {
        setActiveImage(src);
        setImageModalOpen(true);
    };

    const handleCloseImage = () => {
        setImageModalOpen(false);
        setActiveImage(null);
    };

    return (
        <Box sx={{ width: "100%", height: "80vh", display: "flex", flexDirection: "column" }}>
            {user && (
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
                    <Button variant="contained" color="primary" onClick={() => {/* Hook your add modal here */ }}>
                        + Add New
                    </Button>
                </Box>
            )}

            <Box
                id="scrollableDiv"
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 2,
                    paddingTop: "16px",
                }}
            >
                <Grid container spacing={2}>
                    {postsFromBrochure.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onView={handleView}
                            onOpenImage={handleOpenImage}
                            onDownloadImage={() => { }}
                        />
                    ))}
                </Grid>

                {postsFromBrochure.length === 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <Typography>No posts yet.</Typography>
                    </Box>
                )}
            </Box>

            {activePost && (
                <FullPostModal
                    open={modalOpen}
                    onClose={handleClose}
                    post={activePost}
                    onOpenImage={handleOpenImage}
                />
            )}

            <ImageModal open={imageModalOpen} src={activeImage} onClose={handleCloseImage} />
        </Box>
    );
};

export const PostCard = ({ post, onView, onOpenImage, onDownloadImage }) => {
    const firstImage = post.images && post.images.length > 0 ? post.images[0] : null;

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {firstImage ? (
                    <CardMedia
                        component="img"
                        image={firstImage}
                        alt={post.title}
                        sx={{
                            height: 160,
                            objectFit: "cover",
                            cursor: "pointer",
                        }}
                        onClick={() => onOpenImage(firstImage)}
                    />
                ) : (
                    <Box
                        sx={{
                            height: 160,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "grey.100",
                        }}
                    >
                        <ImageIcon fontSize="large" color="disabled" />
                    </Box>
                )}

                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {post.summary}
                    </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 1 }}>
                    <Box>
                        <Button size="small" onClick={() => onView(post)}>
                            View more
                        </Button>
                    </Box>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                        {firstImage && (
                            <>
                                <IconButton
                                    size="small"
                                    href={firstImage}
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                    title="Open image"
                                >
                                    <OpenInFullIcon fontSize="small" />
                                </IconButton>

                                <IconButton
                                    size="small"
                                    component="a"
                                    href={firstImage}
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                    title="Download image"
                                >
                                    <DownloadIcon fontSize="small" />
                                </IconButton>
                            </>
                        )}
                    </Stack>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default BlogsFromBrochureWithImages;