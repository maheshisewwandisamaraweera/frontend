import React, { useState, useEffect } from "react";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SelectChangeEvent } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SignupBg from "../images/signup-bg.jpg";

const Signup: React.FC = () => {
  const [role, setRole] = useState<string>("client");
  const [formValues, setFormValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [businesses, setBusinesses] = useState<string[]>([]);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    if (role === "serviceProviderStaff") {
      axios
        .get("http://localhost:3000/user/business")
        .then((res) => {
          setBusinesses(res.data.map((b: any) => b.businessName));
        })
        .catch(() => {
          setBusinesses([]);
        });
    }
  }, [role]);

  console.log(businesses);

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
    setFormValues({});
    setErrors({});
  };

  const validate = () => {
    let newErrors: any = {};

    if (!formValues.username) newErrors.username = "Username is required.";

    if (
      !formValues.contactNumber ||
      !/^\d{10}$/.test(formValues.contactNumber)
    ) {
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

    if (role === "serviceProviderStaff" && !formValues.businessName) {
      newErrors.businessName = "Business Name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const name = e.target.name as string;
    const value =
      e.target instanceof HTMLInputElement ? e.target.value : e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const userData = {
      username: formValues.username,
      address: formValues.address,
      email: formValues.email,
      contactNumber: formValues.contactNumber,
      password: formValues.password,
      businessName: formValues.businessName,
      businessType: formValues.businessType,
      role: role,
    };
    axios
  .post("http://localhost:3000/user/register", userData)
  .then(({ data }) => {
    // ✅ toast = success
    toast.success("Signup successful! You can now log in.");

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    setTimeout(() => navigate("/login"), 1200);
  })
  .catch((error) => {
    toast.error(error.response?.data?.message || error.message);
  });
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
      { name: "email", label: "Email" },
      { name: "contactNumber", label: "Contact Number" },
      { name: "username", label: "Username" },
      { name: "password", label: "Password", type: "password" },
      { name: "confirmPassword", label: "Confirm Password", type: "password" },
    ],
    serviceProviderStaff: [
      { name: "businessName", label: "Business Name", type: "dropdown" },
      { name: "username", label: "Username" },
      { name: "email", label: "Email" },
      { name: "contactNumber", label: "Contact Number" },
      { name: "password", label: "Password", type: "password" },
      { name: "confirmPassword", label: "Confirm Password", type: "password" },
    ],
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundImage: `url(${SignupBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        width="100%"
        maxWidth={600}
        bgcolor="white"
        borderRadius={3}
        boxShadow={4}
        padding={6}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Sign Up
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            value={role}
            onChange={handleRoleChange}
            label="Role"
          >
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="serviceProviderAdmin">
              Service Provider Admin
            </MenuItem>
            <MenuItem value="serviceProviderStaff">
              Service Provider Staff
            </MenuItem>
          </Select>
        </FormControl>
        {roleFields[role].map((field) => (
          <FormControl key={field.name} fullWidth margin="normal">
            {role === "serviceProviderStaff" && field.name === "businessName" ? (
              <>
                <InputLabel id="business-select-label">
                  {field.label}
                </InputLabel>
                <Select
                  labelId="business-select-label"
                  name="businessName"
                  value={formValues.businessName || ""}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      businessName: e.target.value,
                    })
                  }
                  error={!!errors.businessName}
                  label={field.label}
                >
                  {businesses.length === 0 ? (
                    <MenuItem value="" disabled>
                      No businesses found
                    </MenuItem>
                  ) : (
                    businesses.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.businessName && (
                  <Typography variant="caption" color="error">
                    {errors.businessName}
                  </Typography>
                )}
              </>
            ) : (
              <TextField
                label={field.label}
                name={field.name}
                type={field.type === "password"
                 ? showPassword 
                  ? "text"
                   : "password"
                  : field.name === "confirmPassword"
                  ? showConfirmPassword
                    ? "text"
                      : "password"
                  : field.type || "text"
                }
                value={formValues[field.name] || ""}
                onChange={handleChange}
                error={!!errors[field.name]}
                helperText={errors[field.name] || ""}
                InputProps={{
                  endAdornment:
                    field.type === "password" ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={
                            field.name === "password"
                              ? toggleShowPassword
                              : toggleShowConfirmPassword
                          }
                        >
                          {field.name === "password"
                            ? showPassword
                              ? <VisibilityOff />
                              : <Visibility />
                            : showConfirmPassword
                            ? <VisibilityOff />
                            : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ) : undefined,
                }}
              />
            )}
          </FormControl>
        ))}
        {formValues.password && (
          <Typography
            variant="body2"
            color={
              passwordStrength() === "Strong"
                ? "green"
                : passwordStrength() === "Weak"
                ? "orange"
                : "red"
            }
            mt={1}
          >
            Password Strength: {passwordStrength()}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "#000",
            color: "white",
            "&:hover": { bgcolor: "#333" },
          }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Box mt={3} textAlign="center">
          <Typography variant="body1" component="span">
            Already have an account?{" "}
          </Typography>
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              textDecoration: "underline",
            }}
          >
            Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default Signup;