import { useEffect, useState } from "react";
import { data } from "./data";
import { Box } from "@mui/material";

const ContactUs = () => {
    const [loading, setLoading] = useState(false);
    const [president, setPresident] = useState(null);
    const [otherUsers, setOtherUsers] = useState([]);

    if (loading) return <h1>Loading...</h1>;

    useEffect(() => {
        let others = [];
        data.forEach((user) => {
            if (user.role === "President") {
                setPresident(user);
            } else {
                others.push(user);
            }
        });
        setOtherUsers(others);
    }, []);

    return (
        <section style={styles.section}>
            <Box sx={styles.presidentCard}>
                {president && (
                    <>
                        <h2 style={styles.role}>{president.role}</h2>
                        <img
                            src={president.image}
                            alt={president.name}
                            style={styles.image}
                        />
                        <div style={styles.info}>
                            <h2 style={styles.name}>{president.name}</h2>
                            <p style={styles.address}>{president.address}</p>
                        </div>
                    </>
                )}
            </Box>

            <div style={styles.grid}>
                {otherUsers?.map((eachuser, index) => (
                    <Box key={index} sx={styles.card}>
                        <img
                            src={eachuser.image}
                            alt={eachuser.name}
                            style={styles.image}
                        />
                        <div style={styles.info}>
                            <h2 style={styles.name}>{eachuser.name}</h2>
                            <p style={styles.role}>{eachuser.role}</p>
                            <p style={styles.address}>{eachuser.address}</p>
                        </div>
                    </Box>
                ))}
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
        marginBottom: "40px",
        transition: 'all 0.3s ease',
        '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        width: "100%",
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
        transition: 'all 0.3s ease',
        padding: "6px",
        '&:hover': {
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0)',
        },
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
        fontSize: "20px",
        fontWeight: "600",
        margin: "10px 0 5px",
    },
    role: {
        fontSize: "16px",
        color: "#777",
    },
    address: {
        fontSize: "14px",
        color: "#999",
        marginTop: "10px",
    },
};

export default ContactUs;
