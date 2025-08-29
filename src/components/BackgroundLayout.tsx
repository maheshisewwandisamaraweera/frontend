import React from "react";
import { Box, Container } from "@mui/material";

const BackgroundLayout: React.FC<{ backgroundImage: string; children: React.ReactNode }> = ({
  backgroundImage,
  children,
}) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100%",
        width: "100%",
      }}
    >
      {/* Keep padding for your page content */}
      <Container sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default BackgroundLayout;
