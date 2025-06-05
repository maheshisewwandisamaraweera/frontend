import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import ServiceProviderAdminProfile from "./components/ServiceProviderAdminProfilePage";
import ServiceList from "./components/ServiceList";
import ServiceStaffList from './components/ServiceStaffList';


const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Routes>
          <Route path="/serviceprovideradminprofile" element={<ServiceProviderAdminProfile />} />
          <Route path="/servicelist" element={<ServiceList />} />
          <Route path="/" element={<ServiceStaffList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;


