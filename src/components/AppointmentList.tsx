import React, { useState, useEffect } from "react";
import { 
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Chip, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField 
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
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [clientHistory, setClientHistory] = useState<Appointment[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

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

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>Upcoming Appointments</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
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
                <TableCell>
                  {appointment.status === "Pending" && (
                    <>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="small" 
                        onClick={() => updateAppointmentStatus(appointment.id, "Confirmed")}
                      >
                        Confirm
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        size="small" 
                        sx={{ mx: 1 }} 
                        onClick={() => updateAppointmentStatus(appointment.id, "Canceled")}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    Reschedule
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reschedule Modal */}
      <Dialog open={Boolean(selectedAppointment)} onClose={() => setSelectedAppointment(null)}>
        <DialogTitle>Reschedule Booking</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            type="date" 
            label="New Date" 
            value={rescheduleDate} 
            onChange={(e) => setRescheduleDate(e.target.value)} 
            sx={{ my: 1 }}
          />
          <TextField 
            fullWidth 
            type="time" 
            label="New Time" 
            value={rescheduleTime} 
            onChange={(e) => setRescheduleTime(e.target.value)} 
            sx={{ my: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedAppointment(null)}>Cancel</Button>
          <Button 
            onClick={() => {
              if (selectedAppointment && rescheduleDate && rescheduleTime) {
                updateAppointmentStatus(selectedAppointment.id, "Pending", rescheduleDate, rescheduleTime);
                setSelectedAppointment(null);
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
        <DialogTitle>Client Booking History</DialogTitle>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientHistory.map((appointment) => (
                    <TableRow key={appointment.id}>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No history found for this client.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentSchedule;
