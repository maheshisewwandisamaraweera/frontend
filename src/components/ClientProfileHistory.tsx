import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  TextField,
  Paper,
} from "@mui/material";

interface Booking {
  id: number;
  date: string;
  service: string;
  status: string;
}

interface ClientProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  bookings: Booking[];
}

const mockClientProfiles: ClientProfile[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
    bookings: [
      { id: 1, date: "2025-06-01", service: "Haircut", status: "Completed" },
      { id: 2, date: "2025-06-10", service: "Facial", status: "Scheduled" },
    ],
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@example.com",
    phone: "987-654-3210",
    bookings: [{ id: 3, date: "2025-06-05", service: "Massage", status: "Completed" }],
  },
];

const ClientProfileHistory: React.FC = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);

  const filteredClients = mockClientProfiles.filter((client) =>
    client.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 700, padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Client Profiles & Booking History
        </Typography>

        <TextField
          label="Search Client by Name"
          fullWidth
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          sx={{ mb: 3 }}
        />

        <List sx={{ maxHeight: 200, overflow: "auto", backgroundColor: "#fafafa", borderRadius: 1 }}>
          {filteredClients.map((client) => (
            <ListItem key={client.id} disablePadding>
              <ListItemButton
                selected={selectedClient?.id === client.id}
                onClick={() => setSelectedClient(client)}
              >
                <ListItemText primary={client.name} secondary={client.email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {selectedClient && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Profile Details</Typography>
            <Typography>Name: {selectedClient.name}</Typography>
            <Typography>Email: {selectedClient.email}</Typography>
            <Typography>Phone: {selectedClient.phone}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Booking History</Typography>
            <List>
              {selectedClient.bookings.map((booking) => (
                <ListItem key={booking.id} disablePadding>
                  <ListItemText
                    primary={`${booking.service} on ${booking.date}`}
                    secondary={`Status: ${booking.status}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ClientProfileHistory;
