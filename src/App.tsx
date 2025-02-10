import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/SignUp";

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;


