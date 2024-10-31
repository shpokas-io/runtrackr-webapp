import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function DesktopNav() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        mx: 2,
      }}
    >
      <Button component={Link} to="/" color="inherit">
        Home
      </Button>
      <Button component={Link} to="/all-shoes" color="inherit">
        Shoe library
      </Button>
      <Button component={Link} to="/all-runs" color="inherit">
        All runs
      </Button>
    </Box>
  );
}
