import React, { useEffect, useState } from "react";
import PictureAsPdfIcon from "../../../assets/pdf-icon.png";
import { Box, Grid, IconButton, Typography } from "@mui/material";

const AboutUs = () => {
    const [loading, setLoading] = useState(false);

    // Aims & objectives (you can move these to a separate JSON/file if you prefer)
    const aims = [
        "To work on temples, churches and masjid problems.",
        "Questioning about roads development and water problems to solve the problems.",
        "To help the needy people in natural disasters.",
        "To give support for the people who are below poverty line.",
        "To participate in the programs of minimum facilities in Govt. offices and govt. lands.",
        "To work to protect environment, greenery, trees and cleanliness.",
        "To give needy support to orphanages, orphans and old age persons.",
        "Eradicating child labour — sorting those who are working in hotels, shops and under exploitative situations.",
        "Greenery development using local methods available in localities.",
        "Blood donation methodology and support in need.",
        "To merit scholarships to top students and encourage youth to participate in sports.",
        "Eradicating nutritious food deficiency.",
        "To work for protecting fundamental rights.",
        "To distribute welfare schemes to every needy citizen.",
        "To give health facilities to every needy person and organize medical camps.",
        "To provide representation for people to raise problems to their representatives.",
        "Developing sportsmanship, merit in education and patriotism in students.",
        "To promote spiritual programs and yoga programs.",
        "All the above objects are without any profit motive."
    ];

    const docs = [
        {
            name: "AAKTA9775GE20251_signed_12A",
            title: "AAKTA9775GE20251_signed_12A",
            type: "pdf",
            link: "https://aya-files.s3.eu-north-1.amazonaws.com/aya_documents/AAKTA9775GE20251_signed_12A.pdf"
        },
        {
            name: "AAKTA9775GF20251_signed_80G",
            title: "AAKTA9775GF20251_signed_80G",
            type: "pdf",
            link: "https://aya-files.s3.eu-north-1.amazonaws.com/aya_documents/AAKTA9775GF20251_signed_80G.pdf"
        },
        {
            name: "AYA_Financials_FY_2024-25",
            title: "AYA Financials FY 2024-25",
            type: "pdf",
            link: "https://aya-files.s3.eu-north-1.amazonaws.com/aya_documents/AYA_Financials_FY_2024-25.pdf"
        },
        {
            name: "AYA_ITR_5_FY_2024-25",
            title: "AYA ITR 5 FY 2024-25",
            type: "pdf",
            link: "https://aya-files.s3.eu-north-1.amazonaws.com/aya_documents/AYA_ITR_5_FY_2024-25.pdf"
        },
        {
            name: "AYA_ITR_V_FY_2024-25",
            title: "AYA ITR V FY 2024-25",
            type: "pdf",
            link: "https://aya-files.s3.eu-north-1.amazonaws.com/aya_documents/AYA_ITR_V_FY_2024-25.pdf"
        },
    ]

    const handleOpenDoc = (link) => {
        if (!link) return;
        window.open(link, "_blank", "noopener,noreferrer");
    };

    if (loading) return <h1>Loading...</h1>;

    return (
        <section style={styles.section}>
            <div style={{ width: "100%", maxWidth: 1100 }}>
                <Typography variant="h5" style={{ marginBottom: 12 }}>
                    Aims & Objectives
                </Typography>

                <Box style={styles.aimsBox}>
                    <ol style={{ paddingLeft: 18, margin: 0 }}>
                        {aims.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: 8 }}>
                                <Typography variant="body2">{item}</Typography>
                            </li>
                        ))}
                    </ol>
                </Box>

                {/* Documents section */}
                <Box style={{ marginTop: 24 }}>
                    <Typography variant="h6" style={{ marginBottom: 8 }}>
                        Documents
                    </Typography>

                    {docs.length === 0 ? (
                        <Typography variant="body2" style={{ color: "#666" }}>
                            No documents available. Pass a `docs` prop like:
                            {` { name: \"ITR.pdf\", title: \"ITR file\", type: \"pdf\", link: \"https://s3...\" } `}
                        </Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {docs.map((doc, i) => (
                                <Grid item xs={12} sm={6} md={4} key={i}>
                                    <Box style={styles.docCard}>
                                        <IconButton
                                            aria-label={`Open ${doc.name}`}
                                            onClick={() => handleOpenDoc(doc.link)}
                                            size="small"
                                        >
                                            <img src={PictureAsPdfIcon} alt={doc.title} width={36} />
                                        </IconButton>
                                        <div style={{ marginLeft: 8, flex: 1 }}>
                                            <button
                                                onClick={() => handleOpenDoc(doc.link)}
                                                style={styles.docLink}
                                                aria-label={`Open document ${doc.title || doc.name}`}>
                                                {doc.title || doc.name}
                                            </button>
                                            <Typography variant="caption" style={{ display: "block", color: "#777" }}>
                                                {doc.type?.toUpperCase() || "FILE"}
                                            </Typography>
                                        </div>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </div>
        </section>
    );
};

const styles = {
    section: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
    },
    presidentCard: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
        padding: "15px",
        marginBottom: "24px",
        transition: "all 0.3s ease",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        width: "100%",
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        textAlign: "center",
        transition: "all 0.3s ease",
        padding: "12px",
    },
    image: {
        height: "auto",
        borderRadius: "50%",
        objectFit: "cover",
    },
    info: {
        marginTop: "10px",
    },
    name: {
        fontSize: "18px",
        fontWeight: 600,
        margin: "8px 0 4px",
    },
    role: {
        fontSize: "14px",
        color: "#333",
    },
    address: {
        fontSize: "13px",
        color: "#777",
        marginTop: "6px",
    },
    aimsBox: {
        background: "#fbfbfb",
        padding: 12,
        borderRadius: 8,
    },
    docCard: {
        display: "flex",
        alignItems: "center",
        background: "#fff",
        padding: 10,
        borderRadius: 8,
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
    },
    docLink: {
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        textAlign: "left",
        cursor: "pointer",
        fontSize: 14,
        color: "#0b63d6",
        textDecoration: "underline",
    },
};

export default AboutUs;
