import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SuccessPage = () => {
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
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 64, color: "green", mb: 2 }} />

        <Typography variant="h4" fontWeight="bold" color="green" gutterBottom>
          Payment Successful!
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, fontSize: "18px" }}>
          Thank you for your payment 🎉
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessPage;
