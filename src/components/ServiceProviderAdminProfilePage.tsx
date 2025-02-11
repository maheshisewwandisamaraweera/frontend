import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const ServiceProviderAdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "admin@example.com",
    phone: "+94 712345678",
    business: "Glamourly Salon",
    profilePic: "https://via.placeholder.com/150", // Default profile image
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePic: reader.result as string, // Convert image to base64 URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Profile:", profile);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height
      }}
    >
      <Card sx={{ width: 400, p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <label htmlFor="profile-pic-input">
            <Avatar
              src={profile.profilePic}
              sx={{ width: 80, height: 80, mb: 2, cursor: "pointer" }}
            />
          </label>
          <input
            id="profile-pic-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
          />
          <Typography variant="h6">{profile.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.email}
          </Typography>
        </Box>

        <CardContent>
          <TextField
            fullWidth
            margin="dense"
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Business Name"
            name="business"
            value={profile.business}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </CardContent>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ServiceProviderAdminProfile;
