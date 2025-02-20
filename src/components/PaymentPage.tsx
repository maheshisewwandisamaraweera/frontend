/*import { useState } from "react";
import { 
  Card, CardContent, CardHeader, Typography, TextField, 
  Box, Paper, Button, Grid, Divider 
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileIconButton from "./ProfileIconButton"; // Profile Icon Button import

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract service details from the location state (passed from the previous page)
  const { serviceName, servicePrice, serviceCategory, selectedDate, selectedTime } = location.state || { 
    serviceName: "Haircut", 
    servicePrice: "LKR 500", 
    serviceCategory: "Salon",
    selectedDate: null,
    selectedTime: null
  };

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (cardNumber && expiryDate && cvv && paymentMethod) {
      alert("Payment Successful!");
      navigate("/confirmation");  // Redirect to confirmation page after successful payment
    } else {
      alert("Please fill out all payment details.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      {/* Profile Icon Button }
      <ProfileIconButton />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4, width: "90%", maxWidth: "800px", borderRadius: 3, backgroundColor: "#f8f9fa" }}>
          <Typography variant="h4" fontWeight="bold" color="black" align="center" gutterBottom>
            Payment
          </Typography>

          {/* Service Details }
          <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
            <CardHeader
              title={serviceName}
              subheader={`Category: ${serviceCategory} | Date: ${selectedDate?.format('DD/MM/YYYY')} | Time: ${selectedTime?.format('HH:mm')}`}
              sx={{ backgroundColor: "#1976d2", color: "white", borderRadius: "12px 12px 0 0" }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="primary">
                {servicePrice}
              </Typography>
            </CardContent>
          </Card>

          {/* Payment Form }
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiry Date"
                variant="outlined"
                fullWidth
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Payment Method"
                variant="outlined"
                fullWidth
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Submit Button }
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%", borderRadius: 2 }}
              onClick={handlePaymentSubmit}
            >
              Pay {servicePrice}
            </Button>
          </Box>

          {/* Back Button }
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ width: "100%", borderRadius: 2 }}
              onClick={() => navigate("/services")}
            >
              Back to Services
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}*/
