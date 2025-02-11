import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import SuperAdminDashboard from './components/SuperAdminDashboard'
import Login from './components/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddServiceProvider from './components/AddServiceProvider';

// Create a custom theme for MUI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#4caf50',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<SuperAdminDashboard />} /> {/* Updated route */}
            <Route path="/add-service-provider" element={<AddServiceProvider />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;



