// ProfileIconButton.tsx
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProfileIconButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      color="inherit"
      onClick={() => navigate("/profile")}
      sx={{ ml: 2 }} // margin-left for spacing if needed
    >
      <AccountCircle sx={{ fontSize: 30 }} />
    </IconButton>
  );
};

export default ProfileIconButton;