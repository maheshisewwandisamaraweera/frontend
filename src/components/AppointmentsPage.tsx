import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AppointmentsPage() {
  const navigate = useNavigate();

  // Example state for appointments (could come from a backend API in a real application)
  const [appointments, setAppointments] = useState<any[]>([
    {
      id: "1",
      serviceName: "Haircut",
      date: "2025-02-25T10:30:00",
      status: "Upcoming",
    },
    {
      id: "2",
      serviceName: "Facial Treatment",
      date: "2025-02-20T15:00:00",
      status: "Past",
    },
  ]);

  const handleCancelAppointment = (appointmentId: string) => {
    // Logic to cancel appointment (e.g., API call)
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "Canceled" }
          : appointment
      )
    );
    alert("Appointment canceled successfully!");
  };

  const handleNavigateBack = () => {
    navigate("/"); // Redirect back to the profile page
  };

  useEffect(() => {
    // Fetch appointments data from the API or server
    // e.g., fetch("/api/appointments")
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, width: "90%", maxWidth: "800px", borderRadius: 3, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h4" fontWeight="bold" color="black" align="center" gutterBottom>
          My Appointments
        </Typography>

        {/* Display the list of appointments */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {appointments.length === 0 ? (
            <Typography>No appointments found</Typography>
          ) : (
            appointments.map((appointment) => (
              <Grid item xs={12} key={appointment.id}>
                <Paper sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h6">{appointment.serviceName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(appointment.date).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {appointment.status}
                    </Typography>
                  </Box>

                  {/* Show cancel button only for upcoming appointments */}
                  {appointment.status === "Upcoming" && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </Paper>
              </Grid>
            ))
          )}
        </Grid>

        {/* Navigate to profile page */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button variant="outlined" sx={{ width: "100%", borderRadius: 2 }} onClick={handleNavigateBack}>
            Back 
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
