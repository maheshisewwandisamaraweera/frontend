import React, { useState, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import toast from "react-hot-toast";

const EnterOTP: React.FC = () => {
  const { state } = useLocation();
  const email = state?.email || ""; // Retrieve email passed from ForgotPassword.tsx
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    console.log(`OTP entered for ${email}:`, enteredOtp);
    try {
      // Simulate OTP verification (replace with actual API call)
    await axios.post("http://localhost:3000/user/verify-otp", {
      email,
      otp: enteredOtp,
    });
      toast.success("✅ OTP verified successfully!");
      console.log("✅ OTP verified successfully! Redirecting to reset password...");
      // Redirect to reset password page with the email as state
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("❌ Error verifying OTP:", error);
      toast.error("⚠️ Invalid OTP. Please try again.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5" padding={4}>
      <Box width="100%" maxWidth={500} bgcolor="white" borderRadius={3} boxShadow={5} padding={6} textAlign="center">
        <Typography variant="h3" fontWeight="bold" color="black" mb={3}>
          Enter OTP
        </Typography>
        <Typography variant="h6" color="textSecondary" mb={4}>
          Please enter the 6-digit verification code sent to <b>{email}</b>.
        </Typography>

        <Box display="flex" justifyContent="center" gap={2} mb={4}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              variant="outlined"
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontSize: "1.5rem", width: "50px", height: "50px" },
              }}
            />
          ))}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ bgcolor: "lightblue", color: "black", fontSize: "1rem" }} onClick={() => navigate("/forgot-password")}>
            Resend OTP
          </Button>
          <Button variant="contained" sx={{ bgcolor: "black", color: "white", fontSize: "1rem" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EnterOTP;
