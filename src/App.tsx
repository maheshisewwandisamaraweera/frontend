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

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
  );
};

export default App;



