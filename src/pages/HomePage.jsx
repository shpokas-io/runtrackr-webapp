/* eslint-disable no-unused-vars */
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import shoeImage from "../assets/images/nike-structure.png";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import polyline from "@mapbox/polyline";
import { Button } from "@mui/material";

export default function HomePage() {
  const [shoeStats, setShoeStats] = useState(null);
  const [lastRun, setLastRun] = useState(null);
  const [totalKilometersLastWeek, setTotalKilometersLastWeek] = useState(0);
  const [totalKilometersCurrentWeek, setTotalKilometersCurrentWeek] =
    useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const data = urlParams.get("data");

      if (data) {
        const parsedData = JSON.parse(decodeURIComponent(data));

        if (parsedData.accessToken) {
          localStorage.setItem("accessToken", parsedData.accessToken);
        }
        //Fetch last run and shoe stats
        setLastRun(parsedData.lastRun);
        setShoeStats(parsedData.gear);

        console.log("Parsed Data:", parsedData);

        //Fetch runs data to get total kilometers for the last week
        const accessToken = parsedData.accessToken;
        const response = await axios.get("http://localhost:5000/api/runs", {
          headers: { Authorization: accessToken },
        });

        setTotalKilometersLastWeek(response.data.totalKilometersLastWeek);
        setTotalKilometersCurrentWeek(response.data.totalKilometersCurrentWeek);
        console.log(
          "Last Week Kilometers (Frontend):",
          response.data.totalKilometersLastWeek
        );
        console.log(
          "Current Week Kilometers (Frontend):",
          response.data.totalKilometersCurrentWeek
        );
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

  const formatDuration = (movingTimeString) => {
    if (!movingTimeString) return "N/A"; // Handle undefined or null

    const minutesMatch = movingTimeString.match(/(\d+)\s*minutes/);
    if (minutesMatch) {
      const minutes = parseInt(minutesMatch[1], 10);
      const seconds = minutes * 60; // Convert minutes to seconds
      const hours = Math.floor(seconds / 3600);
      const minutesRemaining = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutesRemaining}m`;
    }

    return "N/A"; // In case the format is unexpected
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "background.default" }}>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>U</Avatar>
        <Typography variant="h4">Hello, UserName</Typography>
        <Typography variant="h6">Your latest statistics:</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Weekly Statistics */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Weekly Statistics
              </Typography>
              <Typography align="center">
                Total kilometers run last week: {totalKilometersLastWeek} km
              </Typography>
              <Typography variant="h6" align="center">
                Total kilometers this week: {totalKilometersCurrentWeek} km
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Shoe Statistics */}
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Shoe Statistics
              </Typography>
              <CardMedia
                component="img"
                height="140"
                image={shoeImage}
                alt="Running Shoes"
                sx={{ objectFit: "contain", p: 1, alignSelf: "center" }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography>{shoeStats?.name || `Loading...`}</Typography>
                <Typography>
                  Total mileage:{" "}
                  {shoeStats ? shoeStats.totalMileage : "Loading..."} km of{" "}
                  {shoeStats ? shoeStats.maxMileage : "Loading..."} km
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => (window.location.href = "/all-shoes")}
              >
                See All Shoes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Last Run Data */}
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Last Run Data
              </Typography>
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: "200px", width: "100%", borderRadius: "8px" }}
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
              <Box sx={{ textAlign: "center" }}>
                <Typography>Name: {lastRun?.name || "Loading..."}</Typography>
                <Typography>
                  Date: {lastRun ? lastRun.date : "Loading..."}
                </Typography>
                <Typography>
                  Distance: {lastRun ? lastRun.distance : "Loading..."} km
                </Typography>
                <Typography>
                  Duration:{" "}
                  {lastRun?.moving_time
                    ? formatDuration(lastRun.moving_time)
                    : "N/A"}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => (window.location.href = "/all-runs")}
              >
                See All Runs
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
