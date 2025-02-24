import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./PaymentPage";

const stripePromise = loadStripe("your-publishable-key-here");

export default function StripeProvider() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentPage />
    </Elements>
  );
}
