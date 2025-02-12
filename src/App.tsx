import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import AppointmentSchedule from "./components/AppointmentList";

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Service Provider App
          </Typography>
          <Button color="inherit" component={Link} to="/">Login</Button>
          <Button color="inherit" component={Link} to="/signup">Signup</Button>
          <Button color="inherit" component={Link} to="/appointments">Appointments</Button>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<AppointmentSchedule />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
