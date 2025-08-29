import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Header />

      {/* Background only for main content */}
      <Box component="main" flex="1" width="100%">
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
