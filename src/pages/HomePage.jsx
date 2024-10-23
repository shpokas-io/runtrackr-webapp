import { Typography, Box, Grid, Avatar } from "@mui/material";
import shoeImage from "../assets/images/shoedummy.webp";
import runImage from "../assets/images/rundummy.jpg";

export default function HomePage() {
  //Sample data
  const shoeStats = {
    name: "Vaporfly",
    totalMileage: 373,
    maxMileage: 500,
  };

  const lastRun = {
    date: "2024-10-20",
    distance: 10, //Km
    duration: "50 minutes",
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* User info for mobile */}

      <Box
        sx={{
          display: { xs: "flex", md: "none" }, //Show only on mobile
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
          {/* Placeholder user icon*/}U
        </Avatar>
        <Typography variant="h4">Hello, UserName</Typography>
        <Typography variant="h6">Here are your latest statistics:</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            p={2}
            border={1}
            borderColor="grey.400"
            borderRadius={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5">Shoe Statistics</Typography>
            <img
              src={shoeImage}
              alt="Running Shoes"
              style={{ width: "200px", borderRadius: "10px", margin: "10px 0" }}
            />
            <Typography>{shoeStats.name} shoes</Typography>
            <Typography>
              Total mileage: {shoeStats.totalMileage} km out of{" "}
              {shoeStats.maxMileage} km
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            p={2}
            border={1}
            borderColor="grey.400"
            borderRadius={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5">Last Run Data</Typography>
            <img
              src={runImage}
              alt="Last Run"
              style={{ width: "200px", borderRadius: "10px", margin: "10px 0" }}
            />
            <Typography>Date: {lastRun.date}</Typography>
            <Typography>Distance: {lastRun.distance} km</Typography>
            <Typography>Duration: {lastRun.duration}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
