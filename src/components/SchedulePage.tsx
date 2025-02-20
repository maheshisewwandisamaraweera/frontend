import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams, useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile icon import
import IconButton from '@mui/material/IconButton';  // Import IconButton

export default function SchedulePage() {
  const { serviceName } = useParams(); // Get selected service from URL
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate(); // Use navigate for navigation

  // Handle Date Change
  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = () => {
    if (!serviceName || !selectedDate || !selectedTime) {
      alert("⚠️ Please select all fields before scheduling.");
      return;
    }
    setOpenSnackbar(true);
  };

  // Handle Profile Button click
  const handleProfileClick = () => {
    navigate("/profile"); // Redirect to Profile page
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4", padding: "20px" }}>
      {/* Profile Button */}
      <IconButton
        sx={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#1976d2",
          color: "white",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
        onClick={handleProfileClick}
      >
        <AccountCircleIcon />
      </IconButton>

      <Paper elevation={4} sx={{ padding: "32px", maxWidth: "500px", borderRadius: "16px", backgroundColor: "#fff" }}>
        <Typography variant="h4" fontWeight="bold" color="black" align="center" gutterBottom>
          Schedule an Appointment for {serviceName}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ mb: 2, width: '100%' }}
          />
          <TimePicker
            label="Select Time"
            value={selectedTime}
            onChange={setSelectedTime}
            sx={{ mb: 3, width: '100%' }} // Apply full width via sx
          />
        </LocalizationProvider>

        <Button variant="contained" fullWidth onClick={handleSubmit}>Confirm Appointment</Button>
      </Paper>
    </Box>
  );
}
