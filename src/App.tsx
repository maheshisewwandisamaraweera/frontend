import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link,Navigate } from "react-router-dom";
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
import AppointmentSchedule from "./components/AppointmentList";
import ServiceProviderAccount from "./components/ServiceProviderAccount";
import AddServiceProvider from './components/AddServiceProvider';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import RejectServiceProvider from './components/RejectServiceProvider';
import ActivateServiceProvider from './components/ActivateServiceProvider';
import DeactivateServiceProvider from './components/DeactivateServiceProvider'
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgetPassword";
import EnterOTP from "./components/EnterOtp";
import ResetPassword from "./components/ResetPassword";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import HomePage from './components/Home'
//import Navbar from "./components/Navbar";
import ServicesPage from "./components/ServicesPage";
import SchedulePage from "./components/SchedulePage";
import AppointmentsPage from "./components/AppointmentsPage";
//import NotificationsPage from "./components/NotificationsPage";
import ReviewsPage from "./components/ReviewsPage";
import PaymentPage from "./components/PaymentPage";
import ProfilePage from "./components/ProfilePage";

import SuccessPage from "./components/SuccessPage";
import StripeProvider from "./components/StripeProvider";
import ConfirmationPage from "./components/ConfirmationPage";

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
      <Container>
  
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Service Provider App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Appointments
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
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/add-service-provider" element={<AddServiceProvider />} />
          <Route path="/reject-service-provider" element={<RejectServiceProvider />} />
          <Route path="/activate-service-provider" element={<ActivateServiceProvider />} />
          <Route path="/deactivate-service-provider" element={<DeactivateServiceProvider />} />
          <Route path="/login" element={<AppointmentSchedule />} />
            <Route path="/service-provider-account" element={<ServiceProviderAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<ServicesPage />} />
          <Route path="/schedule/:serviceName" element={<SchedulePage />} />
          <Route path="/reviews/:serviceName" element={<ReviewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/success" element={<SuccessPage />} />
          </Routes>
      </Container>
      </Container>
    </Router>
  );
};

export default App;
