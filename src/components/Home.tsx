import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Grid, Box, Card, CardContent, CardMedia } from '@mui/material';
import logo from '../images/logo.jpeg'
import spa from '../images/spa.png';
import skincare from '../images/skincare.jpg';
import salon from '../images/salon.jpg';

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
            {/* Logo on the Left Side */}
            <Grid item>
              <img 
                src={logo} // Replace with your actual logo
                alt="App Logo" 
                style={{ height: '80px', width: '100px' }} 
              />
            </Grid>

            {/* Title in the Center */}
            <Grid item>
              <Typography variant="h6">Reservation & Appointment Booking</Typography>
            </Grid>

            {/* Login Button on the Right */}
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleLoginClick}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box sx={{ background:{salon}, backgroundSize: 'cover',backgroundPosition: 'center', padding: '100px 0' }}>
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
          {[
            { title: 'Easy Appointment Booking', text: 'Book in seconds with just a few clicks.' },
            { title: 'Service Provider Profiles', text: 'Browse service providers and view their availability.' },
            { title: 'Multi-Channel Booking', text: 'Book via mobile, desktop, or email.' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={spa}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography>{feature.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 5 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            About Our Reservation & Appointment App
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img 
                src={skincare} // Replace with actual image
                alt="About App" 
                style={{ width: '100%', borderRadius: '10px' }} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                Our Appointment Booking App is designed to provide a seamless and convenient way for users to book appointments with their favorite service providers. Whether it's a salon, spa, medical clinic, or any other service, our platform ensures hassle-free booking and management. 
                <br /><br />
                Key features include real-time availability, instant confirmations, reminders, and a user-friendly interface. Experience the future of online appointment scheduling with our reliable and efficient system!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: '#fafafa', py: 5 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            How It Works
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { step: 'Step 1', text: 'Choose a service' },
              { step: 'Step 2', text: 'Select a date & time' },
              { step: 'Step 3', text: 'Confirm appointment' },
            ].map((item, index) => (
              <Grid item xs={12} sm={3} key={index}>
                <Typography variant="h6" align="center">{item.step}</Typography>
                <Typography align="center">{item.text}</Typography>
              </Grid>
            ))}
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
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {/* Contact Info */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography variant="body2">
                169/2 John Rodrigo Mawatha, Katubedda, Moratuwa, Sri Lanka
              </Typography>
              <Typography variant="body2">📞 077 563 4567 | ☎️ 011 67 3287906</Typography>
            </Grid>

            {/* Copyright */}
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                © 2025 Appointment Booking. All Rights Reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
