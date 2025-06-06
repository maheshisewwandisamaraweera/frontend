import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgetPassword";
import EnterOTP from "./components/EnterOtp";
import ResetPassword from "./components/ResetPassword";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import HomePage from './components/Home'
import { CssBaseline, Container } from "@mui/material";
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
  return (
    <Router>
      <CssBaseline />
      
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
    </Router>
  );
};

export default App;


