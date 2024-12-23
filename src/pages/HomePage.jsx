import { Box, Grid } from "@mui/material";
import polyline from "@mapbox/polyline";
import UserInfo from "../components/user/UserInfo";
import WeeklyStatistics from "../components/run/WeeklyStatistics";
import ShoeStatistics from "../components/shoes/ShoeStatistics";
import LastRunData from "../components/run/LastRunData";
import shoeImage from "../assets/images/nike-structure.png";
import useFetchRunData from "../hooks/useFetchRunData";
import { formatDuration } from "../utils/timeUtils";

export default function HomePage() {
  const state = useFetchRunData();

  if (state.loading) return <div>Loading...</div>;

  const coordinates = state.lastRun?.summary_polyline
    ? polyline.decode(state.lastRun.summary_polyline)
    : [];
  const mapCenter = coordinates.length
    ? [coordinates[0][0], coordinates[0][1]]
    : [0, 0];

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
