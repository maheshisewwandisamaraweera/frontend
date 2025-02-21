import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
//import Navbar from "./components/Navbar";
import ServicesPage from "./components/ServicesPage";
import SchedulePage from "./components/SchedulePage";
import AppointmentsPage from "./components/AppointmentsPage";
//import NotificationsPage from "./components/NotificationsPage";
import ReviewsPage from "./components/ReviewsPage";
import PaymentPage from "./components/PaymentPage";
import ProfilePage from "./components/ProfilePage";
import CheckoutForm from "./components/CheckoutForm";
import SuccessPage from "./components/SuccessPage";


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



const stripePromise = loadStripe("pk_test_51QudmXCF6DmhXmG4h4qHIHEXCchOtXBPo0Im2kwWeds6ZA09ENqhxZbiSCllT5mXRXT1CwcTx2VOhKgiYWFL7AHj001FK40PnU");


const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Elements stripe={stripePromise}></Elements>
      <Container>
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/schedule/:serviceName" element={<SchedulePage />} />
          <Route path="/reviews/:serviceName" element={<ReviewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          
          <Route path="/success" element={<SuccessPage />} />
          
          
        </Routes>
      </Container>
    </Router>
  );
};

export default App;



        




