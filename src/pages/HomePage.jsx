import { Typography, Box, Grid } from "@mui/material";
import shoeImage from "../assets/images/shoedummy.webp";
import runImage from "../assets/images/rundummy.jpg";

export default function HomePage() {
  //Sample data
  const shoeStats = {
    pairs: 2,
    totalMileage: 300,
    averageMileage: 150,
  };

  const lastRun = {
    date: "2024-10-20",
    distance: 10, //Km
    duration: "50 minutes",
  };

  return (
    <Box
      sx={{
        p: 3,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            <Typography>Pairs of shoes: {shoeStats.pairs}</Typography>
            <Typography>Total mileage: {shoeStats.totalMileage} km</Typography>
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
