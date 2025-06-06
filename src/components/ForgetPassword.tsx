import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // React Router Hook to navigate to the next page

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    try {
      // Simulate sending OTP to backend (replace this with actual API call)
      await axios.post("https://your-backend.com/api/send-otp", {
        email,
        otp,
      });

      setMessage(`OTP sent to ${email}`);
      console.log("✅ OTP Sent Successfully! Redirecting...");
    } catch (error) {
      setMessage("⚠️ Failed to send OTP. Try again.");
      console.error("❌ Error sending OTP:", error);
    }

    // Redirect to the Enter OTP page after 2 seconds delay, even if sending OTP fails
    setTimeout(() => {
      navigate("/enter-otp", { state: { email } });
    }, 2000);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      padding={4}
    >
      <Box
        width="100%"
        maxWidth={600} // Increased box width
        bgcolor="white"
        borderRadius={3}
        boxShadow={5}
        padding={8} // More padding for a spacious design
        textAlign="center"
      >
        <Typography variant="h3" fontWeight="bold" color="black" mb={3}>
          Forget Password
        </Typography>
        <Typography variant="h6" color="textSecondary" mb={4}>
          Please enter the Email address you'd like your password reset information sent to.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ fontSize: "1.1rem" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: "1.1rem",
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Submit
          </Button>
        </form>

        {message && (
          <Typography color="green" mt={3} fontSize="1.2rem">
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPassword;
