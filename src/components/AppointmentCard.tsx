import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';

interface Appointment {
  id: string | number;
  date: string;
  time: string;
  confirmed: boolean;
  service: {
    name: string;
    category: string;
    price: number;
  };
}

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: string | number) => void;
}

function AppointmentCard({ appointment, onCancel }: AppointmentCardProps) {
  return (
    <Card sx={{ maxWidth: 600, margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{appointment.service.name}</Typography>
          <Chip
            label={appointment.confirmed ? 'Confirmed' : 'Not Confirmed'}
            color={appointment.confirmed ? 'success' : 'error'}
            size="small"
          />
        </Box>
        <Typography color="text.secondary" gutterBottom>
          {appointment.service.category}
        </Typography>
        <Typography>Date: {appointment.date}</Typography>
        <Typography>Time: {appointment.time}</Typography>
        <Typography>Price: Rs. {appointment.service.price}</Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="error"
            disabled={appointment.confirmed}
            onClick={() => onCancel(appointment.id)}
          >
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AppointmentCard;