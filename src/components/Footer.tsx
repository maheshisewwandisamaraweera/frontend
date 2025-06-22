// footer component

import React from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Footer: React.FC = () => {
  const navigate = useNavigate();

return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: 'white',
        py: 3,
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 1300, // above most content
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
          {/* Contact Info */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">
              169/2 John Rodrigo Mawatha, Katubedda, Moratuwa, Sri Lanka
            </Typography>
            <Typography variant="body2">📞 077 563 4567 | ☎️ 011 67 3287906</Typography>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="body2">
              © 2025 Appointment Booking. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;