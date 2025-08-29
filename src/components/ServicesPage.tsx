import { useEffect, useState } from "react";
import {
  Card, CardContent, CardHeader, Typography, TextField,
  MenuItem, Select, FormControl, InputLabel, Grid,
  Box, Paper, Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
//import Footer from "./Footer"; 
//import Header from "./Header"; 
import axiosInstance from "../utils/axiosInstance";

// call the backend API to get services data by calling axios
export default function ServicesPage() {
  const [servicesData, setServicesData] = useState<any[]>([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:3000/service");
        setServicesData(response.data);
        console.log("Services data fetched:", response.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };

    fetchServices();
  }, []);

  // console.log("Services Data:", servicesData[0].user.businessName);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();

  const filteredServices = servicesData.filter(service =>
    (selectedCategory === "All" || service.category === selectedCategory) &&
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ 
    minHeight: "100vh",
    backgroundImage: `url(/images/login-bg.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
      
      {/* Main content area */}
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      {/* Profile Icon Button */}
      {/* <ProfileIconButton /> */}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5,mb: 5 }}>
        <Paper elevation={3} sx={{ p: 4, width: "90%", maxWidth: "800px", borderRadius: 3, backgroundColor: "#f8f9fa" }}>
          <Typography variant="h4" fontWeight="bold" color="black" align="center" gutterBottom>
            Available Services
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Search services..."
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                  sx={{ backgroundColor: "white", borderRadius: 1 }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Salon">Salon</MenuItem>
                  <MenuItem value="Spa">Spa</MenuItem>
                  <MenuItem value="Skin Care">Skin Care Clinics</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <Grid item xs={12} sm={6} key={service.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
                    <CardHeader
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRadius: "12px 12px 0 0",
                        px: 2,
                        py: 1.5,
                      }}
                      title={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          {/* Left side: Service name and category */}
                          <Box>
                            <Typography variant="h6" color="white" fontWeight="bold">
                              {service.name}
                            </Typography>
                            <Typography variant="body2" color="white">
                              Category: {service.category}
                            </Typography>
                          </Box>
                          {/* Right side: Business logo and name */}
                          <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                            {service.user?.profilePicture ? (
                              <img
                                src={service.user.profilePicture}
                                alt={service.user.businessName}
                                style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff" }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  backgroundColor: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#1976d2",
                                  fontWeight: "bold",
                                  fontSize: 18,
                                }}
                              >
                                {service.user?.businessName ? service.user.businessName[0] : "B"}
                              </Box>
                            )}
                            <Typography variant="body2" color="white" fontWeight="bold" sx={{ mt: 0.5, textAlign: "center" }}>
                              {service.user?.businessName || "Business"}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" color="primary">
                        LKR {service.price}
                      </Typography>

                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Button
                          variant="contained"
                          sx={{
                            flex: 1,
                            borderRadius: "8px",
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": { backgroundColor: "#333" },
                            mr: 1
                          }}
                          onClick={() => navigate(`/schedule/${service.name}/${service.id}`)}
                        >
                          Schedule Appointment
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            flex: 1,
                            borderRadius: "8px",
                          }}
                          onClick={() => navigate(`/reviews/${service.name}/${service.id}`)}
                        >
                          View Reviews
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography align="center" color="error">
                No services found.
              </Typography>
            )}
          </Grid>
        </Paper>
      </Box>
    {/* <Footer/> */}
    </Box>
    </Box>
  );
}
