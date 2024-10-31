import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import NavTitle from "./NavTitle";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import UserAvatar from "../UserAvatar";

export default function Navbar() {
  const isDesktop = useMediaQuery("(min-width:800px)");

  return (
    <AppBar
      position="static"
      sx={{ borderRadius: "0 0 20px 20px", padding: "0 10px" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <NavTitle />
        {isDesktop ? (
          <>
            <DesktopNav />
            <UserAvatar />
          </>
        ) : (
          <Box sx={{ ml: "auto" }}>
            {" "}
            <MobileNav />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
