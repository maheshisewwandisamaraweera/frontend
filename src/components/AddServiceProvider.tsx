import React, { useState } from 'react';
import { Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const AddServiceProvider: React.FC = () => {
  const [serviceProviderName, setServiceProviderName] = useState('');
  const [serviceProviderType, setServiceProviderType] = useState<string>('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Handle input change for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'serviceProviderName') setServiceProviderName(value);
    if (name === 'contactNumber') setContactNumber(value);
    if (name === 'email') setEmail(value);
    if (name === 'address') setAddress(value);
  };

  // Handle select change for service provider type
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setServiceProviderType(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { serviceProviderName, serviceProviderType, contactNumber, email, address });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: 3 
    }}>
      <Card sx={{ width: '100%', maxWidth: 800, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Add New Service Provider Admin
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Service Provider Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Service Provider Admin Name"
                  variant="outlined"
                  fullWidth
                  value={serviceProviderName}
                  onChange={handleInputChange}
                  name="serviceProviderAdminName"
                  required
                />
              </Grid>

              {/* Service Provider Type */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="service-provider-type-label">Service Provider Admin Type</InputLabel>
                  <Select
                    labelId="service-provider-type-label"
                    id="service-provider-type"
                    value={serviceProviderType}
                    onChange={handleSelectChange}
                    label="Service Provider Type"
                  >
                    <MenuItem value="Type1">Salon</MenuItem>
                    <MenuItem value="Type2">Spa</MenuItem>
                    <MenuItem value="Type3">Skin care clinics</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Contact Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  value={contactNumber}
                  onChange={handleInputChange}
                  name="contactNumber"
                  required
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={handleInputChange}
                  name="email"
                  required
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={handleInputChange}
                  name="address"
                  required
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Add Service Provider Admin
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddServiceProvider;
