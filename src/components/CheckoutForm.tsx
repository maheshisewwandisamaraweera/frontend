import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define props for the component
interface CheckoutFormProps {
  serviceName: string;
  selectedDate: any;
  selectedTime: any;
}

export default function CheckoutForm({ serviceName, selectedDate, selectedTime }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    console.log("Payment Successful:", paymentMethod);

    // Redirect to a success page after payment
    navigate("/success", {
      state: { serviceName, selectedDate, selectedTime },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button type="submit" variant="contained" color="primary" disabled={!stripe || loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : "Pay Now"}
      </Button>
    </Box>
  );
}
