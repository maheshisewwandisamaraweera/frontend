import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Link } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Add this import

const Signup: React.FC = () => {
  const [role, setRole] = useState<string>("client");
  const [formValues, setFormValues] = useState<any>({});

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
    setFormValues({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formValues);
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
          <TextField key={field.name} fullWidth margin="normal" label={field.label} name={field.name} type={field.type || "text"} value={formValues[field.name] || ""} onChange={handleChange} />
        ))}
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
