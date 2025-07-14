import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";  // Your separate Header component
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Header />  {/* Place the header here */}

      <Box component="main" flex="1">
        <Container sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
