import { Typography, Box, Grid } from "@mui/material";
// import Navbar from "../components/Navbar";

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
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box p={2} border={1} borderColor="grey.400" borderRadius={2}>
            <Typography variant="h5">Shoe Statistics</Typography>
            <Typography>Pairs of shoes: {shoeStats.pairs}</Typography>
            <Typography>Total mileage: {shoeStats.totalMileage} km</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={2} border={1} borderColor="grey.400" borderRadius={2}>
            <Typography variant="h5">Last Run Data</Typography>
            <Typography>Date: {lastRun.date}</Typography>
            <Typography>Distance: {lastRun.distance} km</Typography>
            <Typography>Duration: {lastRun.duration}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
