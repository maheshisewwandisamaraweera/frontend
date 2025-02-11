import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Grid, Box, Card, CardContent, CardMedia } from '@mui/material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle Login button click
  const handleLoginClick = () => {
    navigate('/login'); // Navigates to the login page
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ backgroundColor: '#f4f4f4', padding: '10px 0' }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Appointment Booking</Typography>
            <Button variant="contained" color="primary" onClick={handleLoginClick}>
              Login
            </Button>
          </Grid>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box sx={{ background: 'url(https://via.placeholder.com/1500x600)', backgroundSize: 'cover', padding: '100px 0', color: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom>
            Easily Book Your Appointment Anytime, Anywhere!
          </Typography>
          <Typography variant="h6" paragraph>
            Seamlessly connect with service providers and manage your appointments with ease.
          </Typography>
          <Button variant="contained" color="secondary" size="large">
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt="Feature 1"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Easy Appointment Booking
                </Typography>
                <Typography>
                  Book in seconds with just a few clicks.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt="Feature 2"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Service Provider Profiles
                </Typography>
                <Typography>
                  Browse service providers and view their availability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt="Feature 3"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Multi-Channel Booking
                </Typography>
                <Typography>
                  Book via mobile, desktop, or email.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: '#fafafa', py: 5 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            How It Works
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" align="center">
                Step 1
              </Typography>
              <Typography align="center">Choose a service</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" align="center">
                Step 2
              </Typography>
              <Typography align="center">Select a date & time</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" align="center">
                Step 3
              </Typography>
              <Typography align="center">Confirm appointment</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          What Our Users Say
        </Typography>
        <Typography variant="body1" color="textSecondary">
          "This app made booking appointments so easy!"
        </Typography>
      </Box>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#333', color: 'white', py: 3 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="body2">© 2025 Appointment Booking. All Rights Reserved.</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
