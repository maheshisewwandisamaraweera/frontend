import React, { useState } from 'react';
import { 
  Box, Button, Typography, List, ListItem, ListItemText, IconButton, 
  TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface StaffDTO {
  id: number;
  name: string;
  category: string;
}

const ServiceStaffList: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffDTO | null>(null);
  const [staffList, setStaffList] = useState<StaffDTO[]>([
    { id: 1, name: 'John Doe', category: 'Manager' },
    { id: 2, name: 'Jane Smith', category: 'Assistant' }
  ]);
  const [staffForm, setStaffForm] = useState<StaffDTO>({ id: 0, name: '', category: '' });

  const handleSaveStaff = () => {
    if (staffForm.id) {
      setStaffList(staffList.map(s => (s.id === staffForm.id ? staffForm : s)));
    } else {
      setStaffList([...staffList, { ...staffForm, id: Date.now() }]);
    }
    setSelectedStaff(null);
    setStaffForm({ id: 0, name: '', category: '' });
  };

  const handleEditStaff = (staff: StaffDTO) => {
    setSelectedStaff(staff);
    setStaffForm(staff);
  };

  const handleRemoveStaff = (id: number) => {
    setStaffList(staffList.filter(staff => staff.id !== id));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setStaffForm(prevState => ({ ...prevState, [name as string]: value }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setStaffForm(prevState => ({ ...prevState, category: e.target.value }));
  };

  return (
    <Box sx={{ padding: 3, border: '2px solid #ccc', borderRadius: 3, width: '80%', margin: 'auto', boxShadow: 3 }}>
      {/* Title */}
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Add Service Provider Staff
      </Typography>

      {/* Staff Form */}
      <Box sx={{ marginBottom: 4, padding: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {selectedStaff ? 'Edit Staff' : 'Add New Staff'}
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={staffForm.name}
          onChange={handleFieldChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            name="category"
            value={staffForm.category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="Salon">Salon</MenuItem>
            <MenuItem value="Spa">Spa</MenuItem>
            <MenuItem value="Skin Care Clinics">Skin care clinics</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={handleSaveStaff}>
          {selectedStaff ? 'Update Staff' : 'Save Staff'}
        </Button>
      </Box>

      {/* Staff List */}
      <Box sx={{ marginTop: 4, padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h6">Staff List</Typography>
        <List>
          {staffList.map((staff) => (
            <ListItem
              key={staff.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ddd',
                paddingY: 1
              }}
            >
              <ListItemText primary={staff.name} secondary={staff.category} />
              <Box>
                <IconButton color="primary" onClick={() => handleEditStaff(staff)} sx={{ marginRight: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleRemoveStaff(staff.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ServiceStaffList;
