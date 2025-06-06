import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';

const RejectServiceProvider: React.FC = () => {
  const rejectedProviders = [
    { id: 1, name: 'Salon XYZ', email: 'contact@salonxyz.com' },
    { id: 2, name: 'Spa ABC', email: 'info@spaabc.com' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 1200,
          minHeight: 600,
          p: 4,
          borderRadius: 4,
          boxShadow: 6,
          backgroundColor: '#ffffff',
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Rejected Service Providers
          </Typography>

          <Grid container spacing={4} mt={2}>
            {rejectedProviders.map((provider) => (
              <Grid item xs={12} sm={6} md={6} key={provider.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: '0.3s',
                    '&:hover': { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'grey.500' }}>
                        <PersonOffIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {provider.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {provider.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RejectServiceProvider;
