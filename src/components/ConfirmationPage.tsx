import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, selectedDate, selectedTime } = location.state || {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        padding: "24px",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "48px",
          maxWidth: "650px",
          width: "100%",
          borderRadius: "24px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          🎉 Appointment Created!
        </Typography>

        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Your appointment for <strong>{serviceName}</strong> is successfully booked.
        </Typography>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="body1" fontSize="18px">
            📅 <strong>Date:</strong>{" "}
            {selectedDate && typeof selectedDate.format === "function"
              ? selectedDate.format("YYYY-MM-DD")
              : selectedDate || "N/A"}
          </Typography>
          <Typography variant="body1" fontSize="18px">
            ⏰ <strong>Time:</strong>{" "}
            {selectedTime && typeof selectedTime.format === "function"
              ? selectedTime.format("HH:mm")
              : selectedTime || "N/A"}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: "16px",
            borderRadius: "12px",
          }}
          onClick={() => navigate("/appointments")}
        >
          🔙 Back to Appointments
        </Button>
      </Paper>
    </Box>
  );
}
