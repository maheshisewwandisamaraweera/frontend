import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  // Example state for user profile (could come from a backend API in a real application)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    contactNumber: "+94 123 456 789",
    profilePicture: "" // Add state for profile picture
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload for profile picture
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Logic to save profile data (e.g., API call)
    alert("Profile saved successfully!");
  };

  // Navigate to appointments page
  const handleNavigateToAppointments = () => {
    navigate("/appointments");  // Redirect to the appointments page
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, width: "90%", maxWidth: "800px", borderRadius: 3, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h4" fontWeight="bold" color="black" align="center" gutterBottom>
          Profile
        </Typography>

        {/* Profile Picture */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            src={profileData.profilePicture || "/default-avatar.png"}  // Default avatar if no picture is uploaded
            sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
          />
          <Button variant="outlined" component="label">
            Upload Profile Picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfilePictureChange}
            />
          </Button>
        </Box>

        {/* Profile Information Form */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              name="contactNumber"
              value={profileData.contactNumber}
              onChange={handleInputChange}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", borderRadius: 2 }}
            onClick={handleSaveProfile}
          >
            Save Profile
          </Button>
        </Box>

        {/* Navigate to appointments page */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="outlined"
            sx={{ width: "100%", borderRadius: 2 }}
            onClick={handleNavigateToAppointments}
          >
            View Appointments
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
