import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../Services/uploadImageToCloudinary";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
///import Header from "./Header";
//import Footer from "./Footer";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    contactNumber: "",
    profilePicture: "",
    businessName: "",
  });
  const storedUser = localStorage.getItem("user");
  let userId = "";

  if (storedUser) {
    const user = JSON.parse(storedUser);
    userId = user.id;
  }

  // get profile data from the backend
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/user/profile/${userId}`);
        setProfileData(response.data);
        console.log("Profile data fetched:", response.data);
        setImageUrl(response.data.profilePicture || "");
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const [imageUrl, setImageUrl] = useState("");

  // Input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cloudinary upload handler
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const loadingId = toast.loading("Uploading image...");
    try {
      const url = await uploadImageToCloudinary(file);
      setImageUrl(url);
      setProfileData((prev) => ({
        ...prev,
        profilePicture: url,
      }));
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      toast.dismiss(loadingId);
    }
  };

  // Save profile
  const handleSaveProfile = async () => {
    try {
      const payload = {
        ...profileData,
        profilePicture: imageUrl,
      };
      await axiosInstance.put(`http://localhost:3000/user/profile/${userId}`, payload)
      console.log("Profile payload:", payload);
      toast.success("Profile saved successfully!");
    } catch (err) {
      toast.error("Failed to save profile");
    }
  };

  const handleNavigateToAppointments = () => {
    navigate("/appointments");
  };

  return (
    <>
      
      <Box sx={{ display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    paddingTop: "80px",
    paddingBottom: "24px",
    px: "20px",
    backgroundImage: `url(/stock)`,  // ✅ background image
    backgroundSize: "cover",
    backgroundPosition: "center",
     }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "90%",
            maxWidth: "800px",
            borderRadius: 3,
            backgroundColor: "#f8f9fa",
            mb: 5,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="black"
            align="center"
            gutterBottom
          >
            Profile
          </Typography>

          {/* Profile Picture */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              src={imageUrl || "/default-avatar.png"}
              sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
            />
            <Button variant="outlined" component="label">
              Upload Profile Picture
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </Button>
          </Box>

          {/* Profile Form */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="name"
                value={profileData.username}
                disabled={true} // Assuming username is not editable
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
            {profileData.businessName && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Business Name"
                  variant="outlined"
                  fullWidth
                  name="businessName"
                  value={profileData.businessName}
                  onChange={handleInputChange}
                  disabled={true} 
                  sx={{ backgroundColor: "white", borderRadius: 1 }}
                />
              </Grid>
            )}
          </Grid>

          {/* Save & Navigate Buttons */}
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

          {storedUser && JSON.parse(storedUser).role === "client" && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="outlined"
                sx={{ width: "100%", borderRadius: 2 }}
                onClick={handleNavigateToAppointments}
              >
                View Appointments
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
      
    </>
  );
}
