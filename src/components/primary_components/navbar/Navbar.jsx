import { useContext, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Close, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import logo from "../../../assets/logo.png";
import './styles.css';


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const scrollToContactUs = (event) => {
        event.preventDefault();
        let contactUs = document.getElementById('footer');
        if (contactUs) {
            contactUs.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <header className="navbar-container">
            <div className="navbar">
                <div className="logo-section">
                    <img src={logo} alt="Association Logo" className="logo" />
                    <h1 className="title">Amadagur Youth Association</h1>
                </div>

                <nav className="nav-links">
                    <div onClick={() => { navigate('/') }} className="nav-link">Home</div>
                    <div onClick={() => { navigate('/blogs') }} className="nav-link">Blog</div>
                    <div onClick={() => { navigate('/about') }} className="nav-link">About</div>
                    <div onClick={scrollToContactUs} className="nav-link">Contact</div>
                    <div onClick={() => { navigate('/members') }} className="nav-link">Members</div>
                </nav>

                <div className="cta">
                    {user ? (
                        <>
                            <Button color="inherit" onMouseEnter={handleMenu} endIcon={<ArrowDropDownRoundedIcon />}>
                                {user.name}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                MenuListProps={{ onMouseLeave: handleClose }}
                            >
                                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                        handleClose();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <button className='login-button' component={Link} onClick={() => navigate('/login')}>
                            Login
                        </button>
                    )}
                </div>

                <div className="mobile-menu-btn">
                    <button
                        className="menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <Close className="icon" /> : <MenuIcon className="icon" />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="mobile-nav">
                    <div onClick={() => { navigate('/') }} className="mobile-nav-link">Home</div>
                    <div onClick={() => { navigate('/blogs') }} className="mobile-nav-link">Blog</div>
                    <div onClick={() => { navigate('/about') }} className="mobile-nav-link">About</div>
                    <div onClick={scrollToContactUs} className="mobile-nav-link">Contact</div>
                    <div onClick={() => { navigate('/members') }} className="mobile-nav-link">Members</div>
                    {
                        user ? (
                            <div className="mobile-menu">
                                <Button
                                    className="mobile-donate-btn"
                                    color="inherit"
                                    onClick={handleMenu}
                                    endIcon={<ArrowDropDownRoundedIcon />}
                                >
                                    {user.name}
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem
                                        component={Link}
                                        to="/profile"
                                        onClick={() => {
                                            handleClose();
                                            isMenuOpen && setIsMenuOpen(false);
                                        }}
                                    >Profile</MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            logout();
                                            handleClose();
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <button className="mobile-donate-btn" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        )
                    }
                </div>
            )}
        </header>
    );
};


export default Navbar;