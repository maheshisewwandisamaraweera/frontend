import { useState, useEffect, use } from "react";
import { Box, Paper, Typography, Button, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AppointmentCard from "../components/AppointmentCard"; 
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
//import Header from "./Header";
//import Footer from "./Footer";

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

  const [appointments, setAppointments] = useState<any[]>([
    // {
    //   id: "1",
    //   serviceName: "Haircut",
    //   date: "2025-02-25T10:30:00",
    //   status: "Upcoming",
    // },
    // {
    //   id: "2",
    //   serviceName: "Facial Treatment",
    //   date: "2025-02-20T15:00:00",
    //   status: "Past",
    // },
  ]);
  const [open, setOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const handleOpenModal = (id: string | number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/appointment/${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments.");
      }
    };
    fetchAppointments();
  }, []);

  const handleConfirmCancel = () => {
    if (!selectedId) return;
    try {
      axiosInstance.delete(`http://localhost:3000/appointment/${selectedId}`)
        .then(() => {
          setAppointments(appointments.filter(appt => appt.id !== selectedId));
          toast.success("Appointment cancelled successfully!");
        })
        .catch(error => {
          console.error("Error cancelling appointment:", error);
          toast.error("Failed to cancel appointment.");
        });
    } catch (error) {
      console.error("Error in handleConfirmCancel:", error);
      toast.error("An error occurred while cancelling the appointment.");
    }
  };
  const handleNavigateBack = () => {
    navigate("/services"); // Redirect back to the profile page
  };


  return (
    <>
    
   <div style={{ width: "80%", alignItems: "center", margin: "auto",marginBottom: "40px" }}>
      <Grid container spacing={5} sx={{ padding: 10 }}>
        {appointments.map(appt => (
          <Grid item xs={12} sm={6} key={appt.id}>
            <AppointmentCard appointment={appt} onCancel={handleOpenModal} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="error" variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* Navigate to profile page */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button variant="outlined" sx={{ width: "10%", borderRadius: 2 }} onClick={handleNavigateBack}>
          Back
        </Button>
      </Box>
    </div>
    
    </>
  );
}
