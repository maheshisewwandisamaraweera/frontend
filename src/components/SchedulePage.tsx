import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams, useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import toast from "react-hot-toast";

export default function SchedulePage() {
  const { serviceName } = useParams(); // Get selected service from URL
  const { serviceId } = useParams<{ serviceId: string }>(); // Get serviceId from URL params
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    const appointmentData = {
      date: selectedDate.format("YYYY-MM-DD"),
      time: selectedTime.format("HH:mm"),
      userId: parseInt(JSON.parse(localStorage.getItem("user") || "{}").id),
      serviceId: parseInt(serviceId || "0"), 
    };

    try {
      const response = await axios.post("http://localhost:3000/appointment", appointmentData);
      console.log("Appointment scheduled:", response.data);
      // clear the selected date and time
      setSelectedDate(null);
      setSelectedTime(null);
      toast.success("Appointment scheduled successfully!");
      //navigate("/profile"); // Redirect to profile page after scheduling
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("Failed to schedule appointment. Please try again.");
    }
  }; 

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f4f4",
      padding: "20px"
    }}>
      <IconButton
        sx={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#1976d2",
          color: "white",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
        onClick={handleProfileClick}
      >
        <AccountCircleIcon />
      </IconButton>

      <Paper elevation={4} sx={{ padding: "32px", maxWidth: "500px", borderRadius: "16px", backgroundColor: "#fff" }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Schedule an Appointment for {serviceName}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={setSelectedDate}
            sx={{ mb: 2, width: '100%' }}
          />
          <TimePicker
            label="Select Time"
            value={selectedTime}
            onChange={setSelectedTime}
            sx={{ mb: 3, width: '100%' }}
          />
        </LocalizationProvider>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Confirm Appointment
        </Button>
      </Paper>
    </Box>
  );
}
