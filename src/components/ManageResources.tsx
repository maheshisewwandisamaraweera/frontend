import React, { useState } from "react";
import {
  Box, Button, Typography, List, ListItem, ListItemText, TextField, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Resource {
  id: number;
  type: string;
  name: string;
}

const ManageResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    { id: 1, type: "Time Slot", name: "9:00 AM - 10:00 AM" },
    { id: 2, type: "Seat", name: "Seat A1" },
    { id: 3, type: "Room", name: "Room 101" },
  ]);

  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [newResource, setNewResource] = useState<Resource>({ id: 0, type: "", name: "" });

  const handleAddOrUpdate = () => {
    if (!newResource.name || !newResource.type) return;

    if (editingResource) {
      setResources(resources.map(r => r.id === editingResource.id ? { ...newResource, id: editingResource.id } : r));
      setEditingResource(null);
    } else {
      setResources([...resources, { ...newResource, id: Date.now() }]);
    }

    setNewResource({ id: 0, type: "", name: "" });
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setNewResource(resource);
  };

  const handleDelete = (id: number) => {
    setResources(resources.filter(r => r.id !== id));
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ maxWidth: 600, width: "100%", padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Manage Resources</Typography>

        <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
          <TextField
            label="Resource Type"
            value={newResource.type}
            onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
            fullWidth
          />
          <TextField
            label="Resource Name"
            value={newResource.name}
            onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddOrUpdate}>
            {editingResource ? "Update" : "Add"}
          </Button>
        </Box>

        <List>
          {resources.map(resource => (
            <ListItem key={resource.id} secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(resource)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(resource.id)} color="error"><DeleteIcon /></IconButton>
              </>
            }>
              <ListItemText primary={resource.name} secondary={resource.type} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ManageResources;
