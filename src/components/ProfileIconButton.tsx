// ProfileIconButton.tsx
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProfileIconButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      color="inherit"
      sx={{
        position: "fixed",
        top: 20,  // Adjust position as needed
        right: 20,  // Place it in the top-right corner
        zIndex: 1000,  // Ensure it stays on top of other elements
      }}
      onClick={() => navigate("/profile")}
    >
      <AccountCircle sx={{ fontSize: 30 }} />
    </IconButton>
  );
};

export default ProfileIconButton;
