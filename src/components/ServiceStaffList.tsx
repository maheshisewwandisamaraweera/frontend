import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';
import Header from './Header';
import Footer from './Footer';

const ServiceStaffList: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const businessName = user.businessName || '';

  const [staffList, setStaffList] = useState<any[]>([]);

  const fetchStaffList = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/user/serviceStaff/${businessName}`);
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);

  // Action handlers (implement API calls as needed)
  const handleAddToStaff = async (id: string) => {
    console.log(`Adding staff with id: ${id}`);
    try {
    const response = await axiosInstance.post(`http://localhost:3000/user/serviceStaff/add/${id}`);
    console.log(response.data);
    toast.success(`Staff with id: ${id} added successfully!`);
    fetchStaffList();
    }
    catch (error) {
      console.error('Error adding staff:', error);
      toast.error(`Failed to add staff with id: ${id}`);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      console.log(`Removing staff with id: ${id}`);
      const response = await axiosInstance.delete(`http://localhost:3000/user/serviceStaff/remove/${id}`);
      console.log(response.data);
      toast.success(`Staff with id: ${id} removed successfully!`);
      fetchStaffList();
    } catch (error) {
      console.error('Error removing staff:', error);
      toast.error(`Failed to remove staff with id: ${id}`);
    }
  };

  return (
    <>
    <Header/>
    <Box sx={{ padding: 3, border: '2px solid #ccc', borderRadius: 3, width: '80%', margin: 'auto', boxShadow: 3 ,minHeight: '80vh'}}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Add Service Provider Staff
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff.id || staff.email}>
                <TableCell>{staff.username}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.contactNumber}</TableCell>
                <TableCell>{staff.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleAddToStaff(staff.id || staff.email)}
                    disabled={staff.status === 'active'}
                  >
                    Add to Staff
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleRemove(staff.id || staff.email)}
                    disabled={staff.status === 'pending' || staff.status === 'hold'}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {staffList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No staff requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    <Footer/>
    </>
  );
};

export default ServiceStaffList;