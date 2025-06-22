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
import axios from "axios";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

interface Staff {
  username: string;
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

const AssignServicesToStaff: React.FC = () => {
  const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
  const businessName = JSON.parse(localStorage.getItem("user") || "{}").businessName;
  // const [staffList] = useState<Staff[]>([
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Jane Smith" },
  // ]);
  // const [serviceList] = useState<Service[]>([
  //   { id: 1, name: "Haircut" },
  //   { id: 2, name: "Facial" },
  // ]);
  const [selectedStaffId, setSelectedStaffId] = useState<number | "">("");
  const [selectedServiceId, setSelectedServiceId] = useState<number | "">("");
  const [assignments, setAssignments] = useState<{ staffId: number; services: Service[] }[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  // get all the services created  by the user
  const fetchServices = async () => {
    try{
      const response = await axiosInstance.get(`http://localhost:3000/service/user/${userId}`); 
      const services = response.data;  
      console.log(response.data)   
      setServiceList(services); 
    } catch (error) {
      console.error("Error fetching services:", error);
      setServiceList([]);
    }
  
    }

  // get all the staff created by the user
  const fetchStaff = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/user/serviceStaff/${businessName}`);
      const staff = response.data;
      console.log(response.data);
      setStaffList(staff);
    } catch (error) {
      console.error("Error fetching staff:", error);
      setStaffList([]);
    }
  }

  useEffect(() => {
    fetchServices();
    fetchStaff();
  }, [userId]);  

  const handleAssign = () => {
    if (selectedStaffId === "" || selectedServiceId === "") return;
    const service = serviceList.find((s) => s.id === selectedServiceId);
    if (!service) return;

    // update the assignee id in service table
    try {
      console.log("Updating service assignee:", service.id, selectedStaffId);
      axiosInstance.put(`http://localhost:3000/service/${service.id}`, {
        assigneeId: selectedStaffId,
      });
    } catch (error) {
      console.error("Error updating service assignee:", error);
      return;
    }
    // clear the input fields
    setSelectedStaffId("");
    setSelectedServiceId("");

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
                {staff.username}
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
