import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material"; // Correct mark icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const PasswordResetSuccess: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginRedirect = () => {
    navigate("/"); // Redirect to the login page
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5" padding={4}>
      <Box width="100%" maxWidth={500} bgcolor="white" borderRadius={3} boxShadow={5} padding={6} textAlign="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="lightgreen"
          borderRadius="50%"
          width={60}
          height={60}
          margin="auto"
          mb={3}
        >
          <CheckCircle sx={{ fontSize: 40, color: "green" }} /> {/* Green check mark */}
        </Box>

        <Typography variant="h4" fontWeight="bold" color="black" mb={3}>
          Your password reset successfully!
        </Typography>

        <Button
          variant="contained"
          color="primary" // Use predefined color like primary
          fullWidth={true} // Correctly set fullWidth as a prop, not inside sx
          sx={{
            backgroundColor: "black", // Styling for black button background
            color: "white", // White text color
            mt: 3,
            py: 1.5,
            fontSize: "1.1rem",
            '&:hover': { bgcolor: "#333" } // Darker shade on hover
          }}
          onClick={handleLoginRedirect}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordResetSuccess;
