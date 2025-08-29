import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import loginBg from "../images/login-bg.jpg";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    console.log("Login submitted with:", { username, password });
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        username,
        password,
      });
      console.log("Login response:", response);
      toast.success("Login successful!");
      const token = response.data.token;

      // Save token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to dashboard or any secured page
      if (response.data.user.role === "client") {
        navigate("/services");
      }
      else if (response.data.user.role === "superAdmin") {
        navigate("/superadmin-dashboard");
      }
      else if (response.data.user.role === "serviceProviderAdmin") {
        navigate("/appointment-schedule");
      }
      else if (response.data.user.role === "serviceProviderStaff") {
        navigate("/appointment-schedule");
      }
    } catch (err: any) {
      console.log("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <Box
    
      //flexDirection="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="hover"
            fontSize="medium"
          >
            Forget Password?
          </Link>
        </Box>
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            bgcolor: "black",
            color: "white",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          Login
        </Button>
        <Box mt={3} textAlign="center">
          <Typography variant="body1" component="span">
            Don’t have an account?{" "}
          </Typography>
          <Link
            component={RouterLink}
            to="/signup"
            underline="hover"
            fontWeight="bold"
            fontSize="1rem"
          >
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
