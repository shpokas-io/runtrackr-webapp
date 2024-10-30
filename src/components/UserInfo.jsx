import { Avatar, Box, Typography } from "@mui/material";

const UserInfo = ({ username }) => (
  <Box
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      mb: 3,
    }}
  >
    <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>{username[0]}</Avatar>
    <Typography variant="h4">Hello, {username}</Typography>
    <Typography variant="h6">Your latest statistics:</Typography>
  </Box>
);

export default UserInfo;
