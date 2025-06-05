import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, selectedDate, selectedTime } = location.state || {};

  const handleNavigate = () => {
    navigate("/confirmation", {
      state: { serviceName, selectedDate, selectedTime },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#e4f7e6",
        padding: "24px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "48px",
          borderRadius: "24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          maxWidth: "650px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="green" gutterBottom>
          ✅ Payment Successful!
        </Typography>

        <Typography variant="h6" gutterBottom>
          Service: <strong>{serviceName}</strong>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Date: <strong>{selectedDate}</strong>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Time: <strong>{selectedTime}</strong>
        </Typography>

        <Typography variant="body1" color="gray" sx={{ mt: 2 }}>
          Thank you for your payment.{" "}
          <Link
            component="button"
            onClick={handleNavigate}
            underline="hover"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            Click here to confirmed!
          </Link>{" "}
          🎉
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessPage;
