import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const ActivateServiceProvider: React.FC = () => {
  const inactiveProviders = [
    { id: 1, name: 'Salon Fresh', email: 'fresh@salon.com' },
    { id: 2, name: 'Healing Spa', email: 'healing@spa.com' },
  ];

  const handleActivate = (id: number) => {
    console.log('Activating provider with id:', id);
    // TODO: API call to activate provider
  };

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
            Activate Service Providers
          </Typography>

          <Grid container spacing={4} mt={2}>
            {inactiveProviders.map((provider) => (
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
                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <PersonIcon />
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
                  <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleActivate(provider.id)}
                    >
                      Activate
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivateServiceProvider;
