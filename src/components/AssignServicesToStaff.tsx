import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface Staff {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

const AssignServicesToStaff: React.FC = () => {
  const [staffList] = useState<Staff[]>([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
  const [serviceList] = useState<Service[]>([
    { id: 1, name: "Haircut" },
    { id: 2, name: "Facial" },
  ]);
  const [selectedStaffId, setSelectedStaffId] = useState<number | "">("");
  const [selectedServiceId, setSelectedServiceId] = useState<number | "">("");
  const [assignments, setAssignments] = useState<{ staffId: number; services: Service[] }[]>([]);

  const handleAssign = () => {
    if (selectedStaffId === "" || selectedServiceId === "") return;
    const service = serviceList.find((s) => s.id === selectedServiceId);
    if (!service) return;

    setAssignments((prev) => {
      const staffAssignment = prev.find((a) => a.staffId === selectedStaffId);
      if (staffAssignment) {
        if (staffAssignment.services.find((s) => s.id === service.id)) return prev; // already assigned
        return prev.map((a) =>
          a.staffId === selectedStaffId
            ? { ...a, services: [...a.services, service] }
            : a
        );
      } else {
        return [...prev, { staffId: selectedStaffId, services: [service] }];
      }
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Assign Services to Staff
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Staff</InputLabel>
          <Select
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value as number)}
            label="Staff"
          >
            {staffList.map((staff) => (
              <MenuItem key={staff.id} value={staff.id}>
                {staff.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Service</InputLabel>
          <Select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value as number)}
            label="Service"
          >
            {serviceList.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleAssign}
          disabled={!selectedStaffId || !selectedServiceId}
          fullWidth
        >
          Assign Service
        </Button>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Current Assignments</Typography>
          <List>
            {assignments.map(({ staffId, services }) => {
              const staff = staffList.find((s) => s.id === staffId);
              return (
                <ListItem key={staffId}>
                  <ListItemText
                    primary={staff?.name}
                    secondary={services.map((s) => s.name).join(", ")}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default AssignServicesToStaff;
