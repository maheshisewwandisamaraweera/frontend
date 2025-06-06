import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  CheckCircle,
  HourglassEmpty,
  Cancel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ServiceProviderStats {
  active: number;
  pending: number;
  deactivated: number;
}

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const serviceProviderStats: ServiceProviderStats = {
    active: 20,
    pending: 5,
    deactivated: 3,
  };

  // Navigation handlers
  const handleAddServiceProvider = () => navigate('/add-service-provider');
  const handleRejectServiceProviders = () => navigate('/reject-service-provider');
  const handleActivateServiceProviders = () => navigate('/activate-service-provider');
  const handleDeactivateServiceProviders = () => navigate('/deactivate-service-provider');
  const handleViewNotifications = () => console.log('Redirect to notifications page');

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        align="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Super Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Overview Box */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 4,
              height: '100%',
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Overview of Service Providers
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                    <CheckCircle color="success" sx={{ fontSize: 36 }} />
                    <Typography variant="h6">{serviceProviderStats.active}</Typography>
                    <Typography variant="body2" color="text.secondary">Active</Typography>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                    <HourglassEmpty color="warning" sx={{ fontSize: 36 }} />
                    <Typography variant="h6">{serviceProviderStats.pending}</Typography>
                    <Typography variant="body2" color="text.secondary">Pending</Typography>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                    <Cancel color="error" sx={{ fontSize: 36 }} />
                    <Typography variant="h6">{serviceProviderStats.deactivated}</Typography>
                    <Typography variant="body2" color="text.secondary">Deactivated</Typography>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications Box */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 4,
              height: '100%',
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Notifications
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                No new updates at the moment.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={handleViewNotifications}
              >
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Links Box */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 4,
              height: '100%',
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Quick Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={handleAddServiceProvider}
                  >
                    Add New Service Provider Admin
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={handleRejectServiceProviders}
                  >
                    Reject Service Provider Admin
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    onClick={handleActivateServiceProviders}
                  >
                    Activate Service Provider Admin
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="warning"
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
