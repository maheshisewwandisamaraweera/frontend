import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const AddServiceProvider: React.FC = () => {
  const [serviceProviderName, setServiceProviderName] = useState('');
  const [serviceProviderType, setServiceProviderType] = useState<string>('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'serviceProviderAdminName') setServiceProviderName(value);
    else if (name === 'contactNumber') setContactNumber(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'address') setAddress(value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setServiceProviderType(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', {
      serviceProviderName,
      serviceProviderType,
      contactNumber,
      email,
      address,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 900,
          borderRadius: 4,
          boxShadow: 6,
          p: 4,
          backgroundColor: '#fff',
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={3}>
            <PersonAddAlt1Icon color="primary" fontSize="large" />
            <Typography variant="h4" fontWeight={700}>
              Add Service Provider Admin
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="service-provider-type-label">Service Type</InputLabel>
                  <Select
                    labelId="service-provider-type-label"
                    id="service-provider-type"
                    value={serviceProviderType}
                    onChange={handleSelectChange}
                    label="Service Type"
                  >
                    <MenuItem value="Salon">Salon</MenuItem>
                    <MenuItem value="Spa">Spa</MenuItem>
                    <MenuItem value="Skin care clinics">Skin Care Clinics</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

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

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={handleInputChange}
                  name="address"
                  multiline
                  rows={3}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit" size="large">
                  Add Service Provider Admin
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddServiceProvider;
