import React, { useState } from "react";
import { Box, TextField, Button, Typography, InputAdornment, IconButton, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom"; // Add this import

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        maxWidth={500}
        bgcolor="white"
        borderRadius={3}
        boxShadow={4}
        padding={6}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Login
        </Typography>
        <TextField fullWidth label="Username" variant="outlined" margin="normal" />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Link href="#" underline="hover" fontSize="medium">
            Forget Password?
          </Link>
        </Box>
        <Button fullWidth variant="contained" sx={{ mt: 4, bgcolor: "black", color: "white", '&:hover': { bgcolor: "#333" } }}>
          Login
        </Button>
        <Box mt={3} textAlign="center">
          <Typography variant="body1" component="span">
            Don’t have an account?{" "}
          </Typography>
          <Link component={RouterLink} to="/signup" underline="hover" fontWeight="bold" fontSize="1rem">
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
