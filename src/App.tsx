import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddServiceProvider from './components/AddServiceProvider';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import RejectServiceProvider from './components/RejectServiceProvider';
import ActivateServiceProvider from './components/ActivateServiceProvider';
import DeactivateServiceProvider from './components/DeactivateServiceProvider'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/add-service-provider" element={<AddServiceProvider />} />
        <Route path="/reject-service-provider" element={<RejectServiceProvider />} />
        <Route path="/activate-service-provider" element={<ActivateServiceProvider />} />
        <Route path="/deactivate-service-provider" element={<DeactivateServiceProvider />} />
      </Routes>
    </Router>
  );
};

export default App;
