import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { CheckCircle, HourglassEmpty, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ServiceProviderStats {
  active: number;
  pending: number;
  deactivated: number;
}

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const serviceProviderStats: ServiceProviderStats = {
    active: 20,
    pending: 5,
    deactivated: 3,
  };

  // Button click handlers for redirection
  const handleAddServiceProvider = () => {
    navigate('/add-service-provider'); // Navigate to Add Service Provider page
  };

  const handleRejectServiceProviders = () => {
    navigate('/reject-service-providers'); // Navigate to Reject Service Providers page
  };

  const handleActivateServiceProviders = () => {
    navigate('/activate-service-providers'); // Navigate to Activate Service Providers page
  };

  const handleDeactivateServiceProviders = () => {
    navigate('/deactivate-service-providers'); // Navigate to Deactivate Service Providers page
  };

  const handleViewNotifications = () => {
    console.log('Redirect to notifications page');
  };

  return (
    <Box sx={{ padding: 2, height: '100vh' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* First Box: Overview of Service Providers */}
        <Grid item xs={12} sm={6} md={4} sx={{ height: '100%' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Overview of Service Provider Admin
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle color="success" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">{serviceProviderStats.active}</Typography>
                  </Card>
                  <Typography variant="body2" color="textSecondary">Active</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HourglassEmpty color="warning" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">{serviceProviderStats.pending}</Typography>
                  </Card>
                  <Typography variant="body2" color="textSecondary">Pending</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Cancel color="error" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">{serviceProviderStats.deactivated}</Typography>
                  </Card>
                  <Typography variant="body2" color="textSecondary">Deactivated</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Box: Notifications */}
        <Grid item xs={12} sm={6} md={4} sx={{ height: '100%' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Notifications
              </Typography>
              <Typography variant="body1">
                No new updates at the moment.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleViewNotifications} sx={{ marginTop: 2 }}>
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Third Box: Quick Links */}
        <Grid item xs={12} sm={6} md={4} sx={{ height: '100%' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Quick Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={handleAddServiceProvider}
                  >
                    Add New Service Provider Admin
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={handleRejectServiceProviders}
                  >
                    Reject Service Provider Admin
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    fullWidth
                    onClick={handleActivateServiceProviders}
                  >
                    Activate Service Provider Admin
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    fullWidth
                    onClick={handleDeactivateServiceProviders}
                  >
                    Deactivate Service Provider Admin
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminDashboard;
