import { useState } from "react";
import { Card, CardContent, CardHeader, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Box, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
}

const servicesData: Service[] = [
  { id: 1, name: "Haircut", category: "Salon", price: "LKR 500" },
  { id: 2, name: "Hair Coloring", category: "Salon", price: "LKR 1500" },
  { id: 3, name: "Facial Treatment", category: "Spa", price: "LKR 2500" },
  { id: 4, name: "Full Body Massage", category: "Spa", price: "LKR 7500" },
  { id: 5, name: "Skin Hydration Therapy", category: "Skin Care", price: "LKR 12000" },
  { id: 6, name: "Acne Treatment", category: "Skin Care", price: "LKR 10000" }
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();

  const filteredServices = servicesData.filter(service =>
    (selectedCategory === "All" || service.category === selectedCategory) &&
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, width: "90%", maxWidth: "800px", borderRadius: 3, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h4" fontWeight="bold" color="black" align="center" gutterBottom>
          Available Services
        </Typography>

        {/* Search and Filter Section */}
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

        {/* Services List */}
        <Grid container spacing={3}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Grid item xs={12} sm={6} key={service.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
                  <CardHeader
                    title={service.name}
                    subheader={`Category: ${service.category}`}
                    sx={{ backgroundColor: "#1976d2", color: "white", borderRadius: "12px 12px 0 0" }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" color="primary">
                      {service.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        borderRadius: "8px",
                        backgroundColor: "black", // Set background color to black
                        color: "white",            // Set text color to white
                        "&:hover": {
                          backgroundColor: "#333", // Darker shade on hover
                        },
                      }}
                      onClick={() => navigate(`/schedule/${service.name}`)}
                    >
                      Schedule Appointment
                    </Button>
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
  );
}
