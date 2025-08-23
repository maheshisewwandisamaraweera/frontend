import React, { useState, useEffect } from "react";
import {
  Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Chip, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";

type Appointment = {
  id: number;
  date: string;
  time: string;
  confirmed: boolean;
  user: {
    id: number;
    username: string;
    email: string;
    address: string;
    contactNumber: string;
    profilePicture: string;
    // ...other user fields...
  };
  service: {
    id: number;
    name: string;
    category: string;
    price: number;
    duration: string;
  };
  notes?: string;
};

// const mockAppointments: Appointment[] = [
//   { id: "1", clientName: "John Doe", service: "Haircut", date: "2025-02-10", time: "10:00 AM", status: "Confirmed", notes: "Prefers short trim" },
//   { id: "2", clientName: "Jane Smith", service: "Facial", date: "2025-02-16", time: "11:30 AM", status: "Pending", notes: "Sensitive skin products used" },
//   { id: "3", clientName: "John Doe", service: "Shaving", date: "2025-01-28", time: "09:00 AM", status: "Canceled", notes: "Canceled due to personal reasons" },
// ];

const AppointmentSchedule: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [clientHistory, setClientHistory] = useState<Appointment[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  // get the appointments from the DB
  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/appointment`);
      setAppointments(response.data);
      console.log("Fetched appointments:", response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments.");
    }
  };

  useEffect(() => {
    fetchAppointments();
    // setAppointments(mockAppointments);
  }, []);

  const updateAppointmentStatus = (id: number, newStatus: "Confirmed" | "Canceled" | "Pending", newDate?: string, newTime?: string) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus, date: newDate || app.date, time: newTime || app.time } : app
      )
    );
  };

  const openClientHistory = (username: string) => {
    const history = appointments.filter(app => app.user.username === username);
    setClientHistory(history);
    setHistoryOpen(true);
  };

  const openBookingDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDetailsOpen(true);
  };

  const openRescheduleDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleOpen(true);
  };

  const handleConfirmApp = (appointment: Appointment) => {
    console.log("Confirming appointment:", appointment);
    try {
      axiosInstance.put(`http://localhost:3000/appointment/confirm/${appointment.id}`, {
        confirmed: true,
      })
      .then(() => {
        updateAppointmentStatus(appointment.id, "Confirmed");
        toast.success("Appointment confirmed successfully!");
        fetchAppointments(); 
      })
      .catch(error => {
        console.error("Error confirming appointment:", error);
        toast.error("Failed to confirm appointment.");
      });
    } catch (error) {
      console.error("Error in handleConfirmApp:", error);
      toast.error("An error occurred while confirming the appointment.");
    }
  };


  const filteredAppointments = appointments.filter(app =>
    (filterStatus === "All" ||
      (filterStatus === "Confirmed" && app.confirmed) ||
      (filterStatus === "Pending" && !app.confirmed)) &&
    (searchQuery === "" || app.user.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
      >
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 1200, width: "100%" }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>Appointment Schedule</Typography>

          {/* Filter & Search */}
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Canceled">Canceled</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Search Client"
              variant="outlined"
              size="small"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          {/* Appointment Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <Button color="primary" onClick={() => openClientHistory(appointment.user.username)}>
                        {appointment.user.username}
                      </Button>
                    </TableCell>
                    <TableCell>{appointment.service.name}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.confirmed ? "Confirmed" : "Pending"}
                        color={appointment.confirmed ? "primary" : "warning"}
                      />
                    </TableCell>
                    <TableCell>{appointment.user.contactNumber || "-"}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" onClick={() => handleConfirmApp(appointment) } disabled={appointment.confirmed}>
                        Confirm
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => openBookingDetails(appointment)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Client History Modal */}
          <Dialog open={historyOpen} onClose={() => setHistoryOpen(false)}>
            <DialogTitle>Client History</DialogTitle>
            <DialogContent>
              {clientHistory.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clientHistory.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell>{app.service.name}</TableCell>
                          <TableCell>{app.date}</TableCell>
                          <TableCell>{app.time}</TableCell>
                          <TableCell>
                            <Chip
                        label={app.confirmed ? "Confirmed" : "Pending"}
                        color={app.confirmed ? "primary" : "warning"}
                      />
                          </TableCell>
                          <TableCell>{app.notes || "No notes"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No past appointments found.</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setHistoryOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>

          {/* View Details Modal */}
          <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)}>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogContent>
              {selectedAppointment && (
                <Box>
                  <Typography><strong>Client:</strong> {selectedAppointment.user.username}</Typography>
                  <Typography><strong>Email:</strong> {selectedAppointment.user.email}</Typography>
                  <Typography><strong>Service:</strong> {selectedAppointment.service.name}</Typography>
                  <Typography><strong>Date:</strong> {selectedAppointment.date}</Typography>
                  <Typography><strong>Time:</strong> {selectedAppointment.time}</Typography>
                  <Typography><strong>Status:</strong> {selectedAppointment.confirmed ? "Confirmed" : "Pending"}</Typography>
                  <Typography><strong>Notes:</strong> {selectedAppointment.notes || "No notes"}</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default AppointmentSchedule;
