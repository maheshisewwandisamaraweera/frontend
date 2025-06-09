import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: string; // e.g., "30 mins"
}

const ManagePricingDuration: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Haircut", price: 25, duration: "30 mins" },
    { id: 2, name: "Facial", price: 50, duration: "60 mins" },
  ]);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formService, setFormService] = useState<Service>({
    id: 0,
    name: "",
    price: 0,
    duration: "",
  });

  const handleSave = () => {
    if (!formService.name || !formService.duration || formService.price <= 0) return;

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? formService : s));
      setEditingService(null);
    } else {
      setServices([...services, { ...formService, id: Date.now() }]);
    }

    setFormService({ id: 0, name: "", price: 0, duration: "" });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormService(service);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          Manage Pricing and Duration
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Service Name"
            value={formService.name}
            onChange={e => setFormService({ ...formService, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            value={formService.price}
            onChange={e => setFormService({ ...formService, price: +e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Duration"
            placeholder="e.g. 30 mins"
            value={formService.duration}
            onChange={e => setFormService({ ...formService, duration: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleSave}>
            {editingService ? "Update Service" : "Add Service"}
          </Button>
        </Box>

        <List>
          {services.map(service => (
            <ListItem
              key={service.id}
              divider
              secondaryAction={
                <>
                  <IconButton onClick={() => handleEdit(service)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(service.id)}
                    color="error"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`${service.name} - $${service.price}`}
                secondary={`Duration: ${service.duration}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ManagePricingDuration;
