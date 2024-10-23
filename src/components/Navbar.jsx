import React, { useState } from "react";
import Appbar from "@mui/material/AppBar";
import AppBar from "@mui/material/AppBar";

export default function Navbar() {
  //State
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key++ + "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const links = [
    { text: "Home", path: "/" },
    { text: "Shoe statistics", path: "/shoe-stats" },
    { text: "Run history", path: "/run-history" },
  ];

  return (
    <>
      <AppBar position="static" />
    </>
  );
}
