import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
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
import StripeProvider from "./components/StripeProvider"; // Optional if not used directly
import ConfirmationPage from "./components/ConfirmationPage";
import ServiceStaffList from './components/ServiceStaffList';
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ManageResources from "./components/ManageResources";
import AssignServicesToStaff from "./components/AssignServicesToStaff";
import ManagePricingDuration from "./components/ManagePricingDuration";
import ManagePayments from "./components/ManagePayments";
import ClientProfileHistory from "./components/ClientProfileHistory";


const App: React.FC = () => {
  return (
    <>
      <Router>
        <CssBaseline />
        <Routes>

          {/* Home and Authentication */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-reset-success" element={<PasswordResetSuccess />} />

          {/* Client */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/schedule/:serviceName/:serviceId" element={<SchedulePage />} />
          <Route path="/reviews/:serviceName/:serviceId" element={<ReviewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Super Admin */}
          {/* <Route path="/superadmin-dashboard" element={<Navigate to="/superadmin-dashboard" replace />} /> */}
          <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="/add-service-provider" element={<AddServiceProvider />} />
          <Route path="/reject-service-provider" element={<RejectServiceProvider />} />
          <Route path="/activate-service-provider" element={<ActivateServiceProvider />} />
          <Route path="/deactivate-service-provider" element={<DeactivateServiceProvider />} />

          {/* Service Provider Staff */}
          <Route path="/service-provider-account" element={<ServiceProviderAccount />} />
          <Route path="/appointment-schedule" element={<AppointmentSchedule />} />

          {/* Service Provider Admin */}
          <Route path="/service-provider-admin-profile" element={<ServiceProviderAdminProfile />} />
          <Route path="/service-list" element={<ServiceList />} />
          <Route path="/service-staff-list" element={<ServiceStaffList />} />
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
