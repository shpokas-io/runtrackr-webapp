import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import polyline from "@mapbox/polyline";
import UserInfo from "../components/UserInfo";
import WeeklyStatistics from "../components/WeeklyStatistics";
import ShoeStatistics from "../components/ShoeStatistics";
import LastRunData from "../components/LastRunData";
import shoeImage from "../assets/images/nike-structure.png";

export default function HomePage() {
  const [state, setState] = useState({
    shoeStats: null,
    lastRun: null,
    totalKilometersLastWeek: 0,
    totalKilometersCurrentWeek: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const data = urlParams.get("data");

      if (data) {
        const parsedData = JSON.parse(decodeURIComponent(data));
        if (parsedData.accessToken) {
          localStorage.setItem("accessToken", parsedData.accessToken);
        }
        const accessToken = parsedData.accessToken;
        const response = await axios.get("http://localhost:5000/api/runs", {
          headers: { Authorization: accessToken },
        });

        setState((prevState) => ({
          ...prevState,
          shoeStats: parsedData.gear,
          lastRun: parsedData.lastRun,
          totalKilometersLastWeek: response.data.totalKilometersLastWeek,
          totalKilometersCurrentWeek: response.data.totalKilometersCurrentWeek,
          loading: false,
        }));
      } else {
        window.location.href = `http://localhost:5000/auth/strava`;
      }
    };

    fetchData();
  }, []);

  if (state.loading) return <div>Loading...</div>;

  const coordinates = polyline.decode(state.lastRun?.summary_polyline);
  const mapCenter = [coordinates[0][0], coordinates[0][1]];

  const formatDuration = (movingTimeString) => {
    if (!movingTimeString) return "N/A"; //
    const minutesMatch = movingTimeString.match(/(\d+)\s*minutes/);
    if (minutesMatch) {
      const minutes = parseInt(minutesMatch[1], 10);
      return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    }
    return "N/A";
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "background.default" }}>
      <UserInfo username="UserName" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WeeklyStatistics
            totalKilometersLastWeek={state.totalKilometersLastWeek}
            totalKilometersCurrentWeek={state.totalKilometersCurrentWeek}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ShoeStatistics shoeStats={state.shoeStats} shoeImage={shoeImage} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LastRunData
            mapCenter={mapCenter}
            coordinates={coordinates}
            lastRun={state.lastRun}
            formatDuration={formatDuration}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
