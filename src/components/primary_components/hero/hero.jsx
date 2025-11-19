import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import heroImage from "@/assets/group_pic.png";
import './styles.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-background">
                <img
                    src={heroImage}
                    alt="Community members working together on social impact projects"
                    className="hero-image"
                />
                <div className="hero-overlay"></div>
            </div>

            {/* Content */}
            {/* <div className="hero-content">
                <div className="fade-up">
                    <div className="hero-subheading">
                        <FavoriteBorderIcon className="hero-icon" />
                        <span className="hero-subtext">Making a Difference Together</span>
                    </div>

                    <h1 className="hero-title">
                        Empowering Communities,
                        <br />
                        <span className="highlight">Changing Lives</span>
                    </h1>

                    <p className="hero-description">
                        Join us in our mission to create sustainable impact through
                        community-driven initiatives, education, and humanitarian aid
                        that transforms lives around the world.
                    </p>
                </div>
            </div> */}
        </section>
    );
}

export default Hero;