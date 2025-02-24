import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Signup from "./components/SignUp";
import AppointmentSchedule from "./components/AppointmentList";
import ServiceProviderAccount from "./components/ServiceProviderAccount";

const App: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <CssBaseline />

      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Service Provider App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Appointments
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>

          {/* Profile Icon & Menu */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to="/service-provider-account"
            >
              Service Provider Account
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<AppointmentSchedule />} />
          <Route path="/service-provider-account" element={<ServiceProviderAccount />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
