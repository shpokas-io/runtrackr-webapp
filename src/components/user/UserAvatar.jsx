import { IconButton, Avatar } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function UserAvatar() {
  return (
    <IconButton edge="end" color="inherit">
      <Avatar sx={{ bgcolor: "primary.main" }}>
        <AccountCircle />
      </Avatar>
    </IconButton>
  );
}
