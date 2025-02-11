import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import eye icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const navigate = useNavigate(); // Hook for navigation

  const handleClickShowPassword = () => setShowPassword((prev) => !prev); // Toggle password visibility
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev); // Toggle confirm password visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (newPassword === confirmPassword) {
      console.log("Password reset successful!");
      navigate("/password-reset-success"); // Redirect to the success page
    } else {
      console.log("Passwords do not match.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5" padding={4}>
      <Box width="100%" maxWidth={500} bgcolor="white" borderRadius={3} boxShadow={5} padding={6} textAlign="center">
        <Typography variant="h3" fontWeight="bold" color="black" mb={3}>
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            sx={{ fontSize: "1.1rem" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ fontSize: "1.1rem" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontSize: "1.1rem", bgcolor: "black", color: "white", '&:hover': { bgcolor: "#333" } }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
