import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgetPassword";
import EnterOTP from "./components/EnterOtp";
import ResetPassword from "./components/ResetPassword";

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;



