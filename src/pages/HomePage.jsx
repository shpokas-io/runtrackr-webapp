/* eslint-disable no-unused-vars */
import { Typography, Box, Grid, Avatar } from "@mui/material";
import axios from "axios";
import shoeImage from "../assets/images/shoedummy.webp";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import polyline from "@mapbox/polyline";

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
  //Decode the polyline
  const coordinates = polyline.decode(lastRun?.summary_polyline);

  const mapCenter = [coordinates[0][0], coordinates[0][1]];

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
        <Grid item xs={12} md={12}>
          <Box
            p={2}
            border={1}
            borderColor="grey.400"
            borderRadius={2}
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="stretch"
            justifyContent="space-between"
            sx={{ height: "auto" }}
          >
            {/* //Shoe statistic box */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: { xs: 0, md: 2 },
                border: 1,
                borderColor: "grey.400",
                borderRadius: 1,
                p: 2,
                mb: { xs: 2, md: 0 },
              }}
            >
              <Typography variant="h5">Shoe Statistics</Typography>
              <img
                src={shoeImage}
                alt="Running Shoes"
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  margin: "10px 0",
                }}
              />
              <Typography>{shoeStats?.name || `Loading...`}</Typography>
              <Typography>
                Total mileage:{" "}
                {shoeStats ? shoeStats.totalMileage : "Loading..."} km out of
                {shoeStats ? shoeStats.maxMileage : "Loading..."} km
              </Typography>
            </Box>

            {/* //Last run data box */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: 1, // Border to create separation
                borderColor: "grey.400",
                borderRadius: 1,
                p: 2,
              }}
            >
              <Typography variant="h5">Last Run Data</Typography>
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: "200px", width: "100%" }} // Adjusted map height
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline
                  positions={coordinates.map((coord) => [coord[0], coord[1]])}
                  color="blue"
                />
              </MapContainer>
              <Typography>Name: {lastRun?.name || "Loading..."}</Typography>
              <Typography>
                Date: {lastRun ? lastRun.date : "Loading..."}
              </Typography>
              <Typography>
                Distance: {lastRun ? lastRun.distance : "Loading..."} km
              </Typography>
              <Typography>Duration: {lastRun?.moving_time}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
