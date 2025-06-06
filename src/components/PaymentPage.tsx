import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import dayjs from "dayjs";

const stripePromise = loadStripe("your-publishable-key-here");

const toDayjsSafe = (input: any) => {
  if (!input) return null;
  if (dayjs.isDayjs(input)) return input;
  const parsed = dayjs(input);
  if (parsed.isValid()) return parsed;
  return null;
};

function PaymentForm() {
  const location = useLocation();
  const { serviceName, selectedDate, selectedTime } = location.state || {};
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const selectedDateObj = toDayjsSafe(selectedDate);
  const selectedTimeObj = toDayjsSafe(selectedTime);

  const canFormatDate = selectedDateObj && typeof (selectedDateObj as any).format === "function";
  const canFormatTime = selectedTimeObj && typeof (selectedTimeObj as any).format === "function";

  if (!serviceName || !canFormatDate || !canFormatTime) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="error">
          ⚠️ Missing or invalid appointment details. Please go back and select your service.
        </Typography>
      </Box>
    );
  }

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const clientSecret = "your-client-secret-from-server";

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    setLoading(false);

    if (error) {
      alert(`❌ Payment failed: ${error.message}`);
    } else if (paymentIntent?.status === "succeeded") {
      alert("✅ Payment successful!");
      navigate("/confirmation", {
        state: {
          serviceName,
          selectedDate: selectedDateObj.toISOString(),
          selectedTime: selectedTimeObj.toISOString(),
        },
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "20px",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "48px",
          maxWidth: "650px",
          width: "100%",
          borderRadius: "24px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Payment for {serviceName}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom color="text.secondary">
          📅 {selectedDateObj.format("YYYY-MM-DD")} | ⏰ {selectedTimeObj.format("HH:mm")}
        </Typography>

        <Box sx={{ my: 4, padding: 2, border: "1px solid #ddd", borderRadius: "12px", backgroundColor: "#fafafa" }}>
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "18px",
                  color: "#424770",
                  letterSpacing: "0.025em",
                  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handlePayment}
          disabled={loading}
          sx={{ mt: 3, padding: "12px 0", fontSize: "16px" }}
        >
          {loading ? <CircularProgress size={24} /> : "💳 Pay Now"}
        </Button>
      </Paper>
    </Box>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
