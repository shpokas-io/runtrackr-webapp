/* eslint-disable no-unused-vars */
import { Typography, Box, Grid, Avatar } from "@mui/material";
import axios from "axios";
import shoeImage from "../assets/images/shoedummy.webp";
import runImage from "../assets/images/rundummy.jpg";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [shoeStats, setShoeStats] = useState(null);
  const [lastRun, setLastRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //Checking if there`s an auth code in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const data = urlParams.get("data");

      if (data) {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setLastRun(parsedData.lastRun);
        setShoeStats(parsedData.gear);
        setLoading(false);
      } else {
        //No data, redirect to strava for auth
        console.log("No authorization code, redirect to Strava..."); //debug line
        window.location.href = `http://localhost:5000/auth/strava`;
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            <Typography>{shoeStats?.name || `Loading...`}</Typography>
            <Typography>
              Total mileage: {shoeStats ? shoeStats.totalMileage : "Loading..."}{" "}
              km out of{shoeStats ? shoeStats.maxMileage : "Loading..."} km
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
            <Typography>
              Date:{lastRun ? lastRun.date : "Loading..."}
            </Typography>
            <Typography>
              Distance: {lastRun ? lastRun.distance : "Loading..."} km
            </Typography>
            {/* <Typography>Duration: {lastRun ? lastRun.duration}</Typography> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
