// waiting for the admin approval page
import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Waiting: React.FC = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkApprovalStatus = async () => {
//       try {
//         const response = await axiosInstance.get('/user/approval-status');
//         if (response.data.approved) {
//           navigate('/services'); // Redirect to services if approved
//         }
//       } catch (error) {
//         console.error('Error checking approval status:', error);
//       }
//     };

//     checkApprovalStatus();
//     const interval = setInterval(checkApprovalStatus, 5000); // Check every 5 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Waiting for Admin Approval
      </Typography>
      <CircularProgress />
      <Typography variant="body1" marginTop={2}>
        Please wait while we process your request.
      </Typography>
    </Box>
  );
};

export default Waiting;