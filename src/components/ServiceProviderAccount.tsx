import React, { useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { AccountCircle, Edit } from "@mui/icons-material";

const ServiceProviderAccount: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+94 71 234 5678");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "center" }}>
        {/* Profile Image Upload Section */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <Avatar 
            sx={{ bgcolor: "primary.main", width: 100, height: 100, mx: "auto" }} 
            src={profileImage || ""}
          >
            {!profileImage && <AccountCircle sx={{ fontSize: 80 }} />}
          </Avatar>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <IconButton 
              color="primary" 
              component="span" 
              sx={{ position: "absolute", bottom: 0, right: 0, bgcolor: "white" }}
            >
              <Edit />
            </IconButton>
          </label>
        </div>

        <Typography variant="h5" sx={{ mt: 2 }}>
          Service Provider Account
        </Typography>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={isEditing ? handleSave : handleEditToggle}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </Button>
      </Paper>
    </Container>
  );
};

export default ServiceProviderAccount;
