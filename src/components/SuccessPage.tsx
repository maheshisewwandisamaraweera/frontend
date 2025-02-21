import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const SuccessPage = () => {
  const location = useLocation();
  const { serviceName, selectedDate, selectedTime } = location.state || {};

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#e4f7e6", padding: "20px" }}>
      <Box sx={{ textAlign: "center", backgroundColor: "white", padding: "32px", borderRadius: "16px", boxShadow: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="green" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Service: {serviceName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Date: {selectedDate}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Time: {selectedTime}
        </Typography>
        <Typography variant="body2" color="gray">
          Thank you for your payment. Your appointment is confirmed!
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessPage;
