import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header";
import Footer from "./Footer";

interface Service {
  category: any;
  id: number;
  name: string;
  serviceType?: string; // Optional field for service type
  price: number;
  duration: string;
}

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState<Service>({ id: 0, name: "", category: "", price: 0, duration: "" });

  // get the services from the database
  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/service/user/${userId}`);
      setServices(response.data);
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  useEffect(()=>{
    fetchServices();
  }, [userId]);

  const handleOpen = () => {
    setNewService({ id: 0, name: "",category:"", price: 0, duration: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleAddService = () => {
    if (newService.name && newService.price && newService.duration) {
      console.log("Adding service:", newService);
      const serviceData = {
        name : newService.name,
        user: userId,
        category: newService.serviceType,
        price : newService.price,
        duration : newService.duration
      }
      console.log(serviceData)
      // send services data to the backend
      axiosInstance.post(`http://localhost:3000/service`,serviceData)
      .then((response) => {
        console.log("Service added:", response.data);
        setServices([...services, response.data]); // Update state with new review
        toast.success("Service added successfully!");
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
      handleClose();
    }
  };

  return (
    <>
    <Header/>
    <Box display="flex" justifyContent="center"  minHeight="80vh" sx={{ backgroundColor: "#f0f0f0", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Service List
        </Typography>
        <List>
          {services.map((service) => (
            <ListItem key={service.id} divider>
              <ListItemText primary={`${service.name} | ${service.category}`} secondary={`Price: $${service.price} | Duration: ${service.duration}`} />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" fullWidth onClick={handleOpen} sx={{ mt: 2 }}>
          Add Service
        </Button>
      </Paper>

      {/* Add Service Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Service Name" name="name" value={newService.name} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Service Type" name="serviceType" value={newService.serviceType} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Price ($)" name="price" type="number" value={newService.price} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Duration" name="duration" value={newService.duration} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddService} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    <Footer />
    </>
  );
};

export default ServiceList;
