import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import {  CssBaseline } from "@mui/material";
import { Toaster } from 'react-hot-toast';

import AppointmentSchedule from "./components/AppointmentList";
import ServiceProviderAccount from "./components/ServiceProviderAccount";
import AddServiceProvider from './components/AddServiceProvider';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import RejectServiceProvider from './components/RejectServiceProvider';
import ActivateServiceProvider from './components/ActivateServiceProvider';
import DeactivateServiceProvider from './components/DeactivateServiceProvider';
import ServiceProviderAdminProfile from "./components/ServiceProviderAdminProfilePage";
import ServiceList from "./components/ServiceList";
import ForgotPassword from "./components/ForgetPassword";
import EnterOTP from "./components/EnterOtp";
import ResetPassword from "./components/ResetPassword";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import HomePage from './components/Home';
import ServicesPage from "./components/ServicesPage";
import SchedulePage from "./components/SchedulePage";
import AppointmentsPage from "./components/AppointmentsPage";
import ReviewsPage from "./components/ReviewsPage";
import PaymentPage from "./components/PaymentPage";
import ProfilePage from "./components/ProfilePage";
import SuccessPage from "./components/SuccessPage";
import ConfirmationPage from "./components/ConfirmationPage";
import ServiceStaffList from './components/ServiceStaffList';
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ManageResources from "./components/ManageResources";
import AssignServicesToStaff from "./components/AssignServicesToStaff";
import ManagePricingDuration from "./components/ManagePricingDuration";
import ManagePayments from "./components/ManagePayments";
import ClientProfileHistory from "./components/ClientProfileHistory";
import Waiting from "./components/Waiting";
import Layout from "./components/Layout";
import loginBg from "./images/login-bg.jpg";
import signupBg from "./images/signup-bg.jpg";
import rock from "./images/rock.jpg";
import success from "./images/success.jpg";
import candle from "./images/candle.jpg";
import spaHero from "./images/spa-hero.jpg";
import stock from "./images/stock.jpg";
import stones from "./images/stones.jpg";
import BackgroundLayout from "./components/BackgroundLayout";





const App: React.FC = () => {
  return (
    <>
      <Router>
        <CssBaseline />
         
        <Routes>

          {/* Home and Authentication */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<BackgroundLayout backgroundImage={loginBg}><Login /></BackgroundLayout>} />
          <Route path="/signup" element={<BackgroundLayout backgroundImage={signupBg}><Signup /></BackgroundLayout>} />
          <Route path="/forgot-password" element={<BackgroundLayout backgroundImage={rock}><ForgotPassword /></BackgroundLayout>} />
          <Route path="/enter-otp" element={<BackgroundLayout backgroundImage={success}><EnterOTP /></BackgroundLayout>} />
          <Route path="/reset-password" element={<BackgroundLayout backgroundImage={signupBg}><ResetPassword /></BackgroundLayout>} />
          <Route path="/password-reset-success" element={<BackgroundLayout backgroundImage={stones}><PasswordResetSuccess /></BackgroundLayout>} />
          <Route path="/waiting" element={<Waiting />} />

          {/* Client */}
          <Route path="/services" element={<Layout><BackgroundLayout backgroundImage={loginBg}><ServicesPage /></BackgroundLayout></Layout>} />
          <Route path="/schedule/:serviceName/:serviceId" element={<Layout><BackgroundLayout backgroundImage={candle}><SchedulePage /></BackgroundLayout></Layout>} />
          <Route path="/reviews/:serviceName/:serviceId" element={<Layout><BackgroundLayout backgroundImage={spaHero}><ReviewsPage /></BackgroundLayout></Layout>} />
          <Route path="/profile" element={<Layout><BackgroundLayout backgroundImage={stock}><ProfilePage /></BackgroundLayout></Layout>} />
          <Route path="/appointments" element={<Layout><BackgroundLayout backgroundImage={stones}><AppointmentsPage /></BackgroundLayout></Layout>} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<BackgroundLayout backgroundImage={success}><ConfirmationPage /></BackgroundLayout>} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Super Admin */}
          {/* <Route path="/superadmin-dashboard" element={<Navigate to="/superadmin-dashboard" replace />} /> */}
          <Route path="/superadmin-dashboard" element={<SuperAdminDashboard /> } />
          <Route path="/add-service-provider" element={<AddServiceProvider />} />
          <Route path="/reject-service-provider" element={<RejectServiceProvider />} />
          <Route path="/activate-service-provider" element={<ActivateServiceProvider />} />
          <Route path="/deactivate-service-provider" element={<DeactivateServiceProvider />} />

          {/* Service Provider Staff */}
          <Route path="/service-provider-account" element={<ServiceProviderAccount />} />
          <Route path="/appointment-schedule" element={<Layout><BackgroundLayout backgroundImage={spaHero}><AppointmentSchedule /></BackgroundLayout></Layout>} />

          {/* Service Provider Admin */}
          <Route path="/service-provider-admin-profile" element={<ServiceProviderAdminProfile />} />
          <Route path="/service-list" element={<Layout><BackgroundLayout backgroundImage={stock}><ServiceList /></BackgroundLayout></Layout>} />
          <Route path="/service-staff-list" element={<Layout><BackgroundLayout backgroundImage={rock}><ServiceStaffList /></BackgroundLayout></Layout>} />
          <Route path="/manage-resources" element={<ManageResources />} />
          <Route path="/assign-services-to-staff" element={<AssignServicesToStaff />} />
          <Route path="/manage-pricing-duration" element={<ManagePricingDuration />} />
          <Route path="/manage-payments" element={<ManagePayments />} />
          <Route path="/client-profile-history" element={<ClientProfileHistory />} />



        </Routes>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
