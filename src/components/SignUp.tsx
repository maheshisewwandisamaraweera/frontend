import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Link,
  
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Signup: React.FC = () => {
  const [role, setRole] = useState<string>("client");
  const [formValues, setFormValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
    setFormValues({});
    setErrors({});
  };

  const validate = () => {
    let newErrors: any = {};
    
    if (!formValues.username) newErrors.username = "Username is required.";
    
    if (!formValues.contactNumber || !/^\d{10}$/.test(formValues.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be exactly 10 digits.";
    }

    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Enter a valid email (must contain '@' and '.').";
    }

    if (!formValues.password) {
      newErrors.password = "Password is required.";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(formValues.password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[\W_]/.test(formValues.password)) {
      newErrors.password = "Password must contain at least one special character.";
    }

    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Form Submitted:", formValues);
    }
  };

  const passwordStrength = () => {
    const pwd = formValues.password || "";
    if (pwd.length < 8) return "Poor";
    if (!/[A-Z]/.test(pwd) || !/[\W_]/.test(pwd)) return "Weak";
    return "Strong";
  };

  const roleFields: Record<string, any[]> = {
    client: [
      { name: "username", label: "Username" },
      { name: "address", label: "Address" },
      { name: "email", label: "Email" },
      { name: "contactNumber", label: "Contact Number" },
      { name: "password", label: "Password", type: "password" },
      { name: "confirmPassword", label: "Confirm Password", type: "password" },
    ],
    serviceProviderAdmin: [
      { name: "businessName", label: "Business Name" },
      { name: "address", label: "Business Address" },
      { name: "businessType", label: "Business Type" },
      { name: "contactNumber", label: "Contact Number" },
      { name: "password", label: "Password", type: "password" },
      { name: "confirmPassword", label: "Confirm Password", type: "password" },
    ],
    serviceProviderStaff: [
      { name: "businessName", label: "Business Name" },
      { name: "username", label: "Username" },
      { name: "email", label: "Email" },
      { name: "contactNumber", label: "Contact Number" },
      { name: "password", label: "Password", type: "password" },
      { name: "confirmPassword", label: "Confirm Password", type: "password" },
    ],
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5" padding={4}>
      <Box width="100%" maxWidth={600} bgcolor="white" borderRadius={3} boxShadow={4} padding={6}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Sign Up
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select labelId="role-select-label" value={role} onChange={handleRoleChange}>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="serviceProviderAdmin">Service Provider Admin</MenuItem>
            <MenuItem value="serviceProviderStaff">Service Provider Staff</MenuItem>
          </Select>
        </FormControl>
        {roleFields[role].map((field) => (
          <FormControl key={field.name} fullWidth margin="normal">
            <TextField
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              error={!!errors[field.name]}
              helperText={errors[field.name] || ""}
            />
          </FormControl>
        ))}
        {formValues.password && (
          <Typography variant="body2" color={passwordStrength() === "Strong" ? "green" : passwordStrength() === "Weak" ? "orange" : "red"} mt={1}>
            Password Strength: {passwordStrength()}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, bgcolor: "#000", color: "white", "&:hover": { bgcolor: "#333" } }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Box mt={3} textAlign="center">
          <Typography variant="body1" component="span">
            Already have an account?{" "}
          </Typography>
          <Link component={RouterLink} to="/" sx={{ fontWeight: "bold", fontSize: "1rem", textDecoration: "underline" }}>
            Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
