// header component
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpeg"; // Import your logo image
import ProfileIconButton from "./ProfileIconButton"; // Import the Profile Icon Button component
import Footer from "./Footer"; // Import the Footer component
import { useEffect } from "react";
import axios from "axios";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useState } from "react";



const Header: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewProfile = () => {
        handleClose();
        navigate("/profile");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        handleClose();
        navigate("/login");
    };

    // Determine if user is client
    const isClient = user && user.role === "client";
    // Determine if user is service provider
    const isServiceProvider = user && user.role === "serviceProviderAdmin";

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#333" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Left: Logo */}
                    <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                        <img src={logo} alt="Logo" style={{ height: "50px", marginRight: "20px" }} />
                    </Box>
                    {/* Center: Nav Items (only for client) */}
                    {isClient && (
                        <Box sx={{ flex: 2, display: "flex", justifyContent: "center", gap: 4 }}>
                            <Button color="inherit" onClick={() => navigate("/services")}>
                                Services
                            </Button>
                            <Button color="inherit" onClick={() => navigate("/appointments")}>
                                Appointments
                            </Button>
                        </Box>
                    )}
                    {
                        isServiceProvider && (
                            <Box sx={{ flex: 2, display: "flex", justifyContent: "center", gap: 4 }}>
                                <Button color="inherit" onClick={() => navigate("/appointment-schedule")}>
                                    Appointments
                                </Button>
                                <Button color="inherit" onClick={() => navigate("/service-staff-list")}>
                                    Staff
                                </Button>
                                <Button color="inherit" onClick={() => navigate("/service-list")}>
                                    Services
                                </Button>
                            </Box>
                        )
                    }
                    {/* Right: Profile */}
                    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                        {user && user.id ? (
                            <>
                                <IconButton onClick={handleProfileClick} color="inherit">
                                    <Avatar src={user.profilePicture || ""} alt={user.name || "Profile"} />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button color="inherit" onClick={() => navigate("/login")}>
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {/* <Footer/> */}
        </Box>
    );
};
export default Header;