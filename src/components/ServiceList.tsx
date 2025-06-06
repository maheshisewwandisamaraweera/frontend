import React, { useState } from "react";
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: string;
}

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Haircut", price: 20, duration: "30 min" },
    { id: 2, name: "Facial", price: 50, duration: "1 hour" },
  ]);

  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState<Service>({ id: 0, name: "", price: 0, duration: "" });

  const handleOpen = () => {
    setNewService({ id: 0, name: "", price: 0, duration: "" });
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
      setServices([...services, { ...newService, id: services.length + 1 }]);
      handleClose();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Service List
        </Typography>
        <List>
          {services.map((service) => (
            <ListItem key={service.id} divider>
              <ListItemText primary={service.name} secondary={`Price: $${service.price} | Duration: ${service.duration}`} />
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
  );
};

export default ServiceList;
