import { Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";
import "./styles.css";

export default function Footer() {
    return (
        <footer className="footer-container" id="footer">
            <div className="footer-content">
                <div className="footer-grid">
                    <div className="brand-section">
                        <div className="brand-header">
                            <FavoriteIcon className="brand-icon" />
                            <Typography variant="h6" className="brand-title">
                                Amadagur Youth Association
                            </Typography>
                        </div>
                        <Typography className="brand-desc">
                            Dedicated to creating sustainable change through community
                            empowerment, education, and humanitarian aid. Together, we build a
                            better tomorrow.
                        </Typography>
                        <div className="social-icons">
                            <IconButton className="social-btn">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton className="social-btn">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton className="social-btn">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton className="social-btn">
                                <LinkedInIcon />
                            </IconButton>
                        </div>
                    </div>

                    <div className="links-section">
                        <Typography variant="subtitle1" className="links-title">
                            Quick Links
                        </Typography>
                        <ul className="links-list">
                            {[
                                "About Us",
                                "Our Projects",
                                "Get Involved",
                                "News & Updates",
                                "Annual Reports",
                            ].map((link) => (
                                <li key={link}>
                                    <a href="#" className="footer-link">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="contact-section">
                        <Typography variant="subtitle1" className="contact-title">
                            Contact Us
                        </Typography>
                        <div className="contact-item">
                            <MailIcon className="contact-icon" />
                            <span>amadaguryouthassociation@gmail.com</span>
                        </div>
                        <div className="contact-item">
                            <PhoneIcon className="contact-icon" />
                            <span>+91 8867599999</span>
                        </div>
                        <div className="contact-item">
                            <RoomIcon className="contact-icon" />
                            <span>
                                No.1-4 Pattigadda street, Amadagur
                                <br />
                                Sri Satya Sai Dist, Andhra Pradesh 515556
                            </span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <Typography className="footer-copy">
                        © 2024 Amadagur Youth Association. All rights reserved.
                    </Typography>
                    <div className="footer-links">
                        <a href="#" className="footer-link">
                            Privacy Policy
                        </a>
                        <a href="#" className="footer-link">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
