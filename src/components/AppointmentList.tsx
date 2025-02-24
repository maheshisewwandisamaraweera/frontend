import React, { useState, useEffect } from "react";
import { 
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Chip, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Select, MenuItem, InputLabel, FormControl 
} from "@mui/material";

type Appointment = {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Canceled";
  notes?: string;
};

const mockAppointments: Appointment[] = [
  { id: "1", clientName: "John Doe", service: "Haircut", date: "2025-02-10", time: "10:00 AM", status: "Confirmed", notes: "Prefers short trim" },
  { id: "2", clientName: "Jane Smith", service: "Facial", date: "2025-02-16", time: "11:30 AM", status: "Pending", notes: "Sensitive skin products used" },
  { id: "3", clientName: "John Doe", service: "Shaving", date: "2025-01-28", time: "09:00 AM", status: "Canceled", notes: "Canceled due to personal reasons" },
];

const AppointmentSchedule: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [clientHistory, setClientHistory] = useState<Appointment[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false); // Separate state for details modal
  const [rescheduleOpen, setRescheduleOpen] = useState(false); // Separate state for reschedule modal

  useEffect(() => {
    setAppointments(mockAppointments);
  }, []);

  const updateAppointmentStatus = (id: string, newStatus: "Confirmed" | "Canceled" | "Pending", newDate?: string, newTime?: string) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus, date: newDate || app.date, time: newTime || app.time } : app
      )
    );
  };

  const openClientHistory = (clientName: string) => {
    const history = appointments.filter(app => app.clientName === clientName);
    setClientHistory(history);
    setHistoryOpen(true);
  };

  const openBookingDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDetailsOpen(true); // Open details modal
  };

  const openRescheduleDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleOpen(true); // Open reschedule modal
  };

  const filteredAppointments = appointments.filter(app =>
    (filterStatus === "All" || app.status === filterStatus) &&
    (searchQuery === "" || app.clientName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>Appointment Schedule</Typography>

      {/* Filter & Search Bar */}
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
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

      {/* Appointment Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <Button color="primary" onClick={() => openClientHistory(appointment.clientName)}>
                    {appointment.clientName}
                  </Button>
                </TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Chip 
                    label={appointment.status} 
                    color={
                      appointment.status === "Pending" ? "warning" :
                      appointment.status === "Confirmed" ? "primary" :
                      "default"
                    } 
                  />
                </TableCell>
                <TableCell>{appointment.notes || "No notes"}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => openRescheduleDialog(appointment)}>
                    Reschedule
                  </Button>
                  {/* View Details button */}
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

      {/* Reschedule Modal */}
      <Dialog open={rescheduleOpen} onClose={() => setRescheduleOpen(false)}>
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogContent>
          <TextField fullWidth type="date" label="New Date" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} sx={{ my: 1 }} />
          <TextField fullWidth type="time" label="New Time" value={rescheduleTime} onChange={(e) => setRescheduleTime(e.target.value)} sx={{ my: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRescheduleOpen(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              if (selectedAppointment && rescheduleDate && rescheduleTime) {
                updateAppointmentStatus(selectedAppointment.id, "Pending", rescheduleDate, rescheduleTime);
                setRescheduleOpen(false); // Close Reschedule dialog after saving
              }
            }} 
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
                      <TableCell>{app.service}</TableCell>
                      <TableCell>{app.date}</TableCell>
                      <TableCell>{app.time}</TableCell>
                      <TableCell>
                        <Chip 
                          label={app.status} 
                          color={
                            app.status === "Pending" ? "warning" :
                            app.status === "Confirmed" ? "primary" :
                            "default"
                          } 
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

      {/* View Details Modal for Upcoming Appointment */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)}>
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <div>
              <Typography><strong>Client:</strong> {selectedAppointment.clientName}</Typography>
              <Typography><strong>Service:</strong> {selectedAppointment.service}</Typography>
              <Typography><strong>Date:</strong> {selectedAppointment.date}</Typography>
              <Typography><strong>Time:</strong> {selectedAppointment.time}</Typography>
              <Typography><strong>Status:</strong> {selectedAppointment.status}</Typography>
              <Typography><strong>Notes:</strong> {selectedAppointment.notes || "No notes"}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default AppointmentSchedule;
