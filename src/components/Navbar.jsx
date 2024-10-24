import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isDesktop = useMediaQuery("(min-width:800px)");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ borderRadius: "0 0 20px 20px", padding: "0 10px" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Runtrackr</Typography>

        {/* NAV FOR DESKTIOP */}
        {isDesktop ? (
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
            <Button component={Link} to="/shoes" color="inherit">
              Shoe library
            </Button>
            <Button component={Link} to="/runs" color="inherit">
              All runs
            </Button>
          </Box>
        ) : (
          //BURGER MENU FOR MOBILE
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/runs" onClick={handleMenuClose}>
                All runs
              </MenuItem>
              <MenuItem component={Link} to="/shoes" onClick={handleMenuClose}>
                Shoe library
              </MenuItem>
            </Menu>
          </>
        )}

        {/* User bubble for Desktop */}
        {isDesktop && (
          <IconButton edge="end" color="inherit">
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
