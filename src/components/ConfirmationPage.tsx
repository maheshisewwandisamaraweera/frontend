import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, selectedDate, selectedTime } = location.state || {};

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4", padding: "20px" }}>
      <Paper elevation={4} sx={{ padding: "32px", maxWidth: "500px", borderRadius: "16px", backgroundColor: "#fff" }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Appointment Confirmed! 🎉
        </Typography>
        <Typography variant="body1" align="center">
          Your appointment for {serviceName} is confirmed.
        </Typography>
        <Typography variant="body1" align="center">
          Date: {selectedDate?.format("YYYY-MM-DD")} | Time: {selectedTime?.format("HH:mm")}
        </Typography>

        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
}
