import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Button, Typography, Box, Paper } from "@mui/material";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe with your public key
const stripePromise = loadStripe("pk_test_51QudmXCF6DmhXmG4h4qHIHEXCchOtXBPo0Im2kwWeds6ZA09ENqhxZbiSCllT5mXRXT1CwcTx2VOhKgiYWFL7AHj001FK40PnU");

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve booking details from the location state
  const { serviceName, selectedDate, selectedTime } = location.state || {};

  // If no booking details are provided, redirect to the home page
  useEffect(() => {
    if (!serviceName || !selectedDate || !selectedTime) {
      navigate("/"); // Redirect to home if accessed without booking details
    }
  }, [serviceName, selectedDate, selectedTime, navigate]);

  // Convert selectedDate and selectedTime to valid Date objects
  const dateObject = selectedDate ? new Date(selectedDate) : null;
  const timeObject = selectedTime ? new Date(`1970-01-01T${selectedTime}`) : null;

  // Format date and time safely
  const formattedDate = dateObject
    ? dateObject.toLocaleDateString("en-CA") // YYYY-MM-DD format
    : "Invalid Date";

  const formattedTime = timeObject
    ? timeObject.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) // hh:mm AM/PM format
    : "Invalid Time";

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4", padding: "20px" }}>
      <Paper elevation={4} sx={{ padding: "32px", maxWidth: "500px", borderRadius: "16px", backgroundColor: "#fff" }}>
        <Typography variant="h4" fontWeight="bold" color="black" align="center" gutterBottom>
          Payment for {serviceName}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Appointment Date: {formattedDate}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Appointment Time: {formattedTime}
        </Typography>

        {/* Stripe Elements for Payment */}
        <Elements stripe={stripePromise}>
          <CheckoutForm serviceName={serviceName} selectedDate={formattedDate} selectedTime={formattedTime} />
        </Elements>
      </Paper>
    </Box>
  );
}
