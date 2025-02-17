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
import { useParams } from "react-router-dom";
import { Dayjs } from "dayjs";

export default function SchedulePage() {
  const { serviceName } = useParams();  // Get selected service from URL
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4", padding: "20px" }}>
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
            sx={{ mb: 3, width: '100%' }}  // Apply full width via sx
          />
        </LocalizationProvider>

        <Button variant="contained" fullWidth onClick={handleSubmit}>Confirm Appointment</Button>
      </Paper>
    </Box>
  );
}
