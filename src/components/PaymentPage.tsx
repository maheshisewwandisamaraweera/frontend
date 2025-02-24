import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Typography, Button, Box, Paper, CircularProgress } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe public key
const stripePromise = loadStripe("your-publishable-key-here");

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const { serviceName, selectedDate, selectedTime } = location.state || {};

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    
    const { error, paymentIntent } = await stripe.confirmCardPayment("your-client-secret-from-server", {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    setLoading(false);

    if (error) {
      alert(`Payment failed: ${error.message}`);
    } else if (paymentIntent?.status === "succeeded") {
      alert("Payment successful!");
      navigate("/confirmation", { state: { serviceName, selectedDate, selectedTime } });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4", padding: "20px" }}>
      <Paper elevation={4} sx={{ padding: "32px", maxWidth: "500px", borderRadius: "16px", backgroundColor: "#fff" }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Payment for {serviceName}
        </Typography>
        <Typography variant="body1" align="center">
          Date: {selectedDate?.format("YYYY-MM-DD")} | Time: {selectedTime?.format("HH:mm")}
        </Typography>
        
        <Box sx={{ my: 3 }}>
          <CardElement options={{ hidePostalCode: true }} />
        </Box>

        <Button variant="contained" fullWidth onClick={handlePayment} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Pay Now"}
        </Button>
      </Paper>
    </Box>
  );
}
