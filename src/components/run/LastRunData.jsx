import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import PropTypes from "prop-types";

const LastRunData = ({ mapCenter, coordinates, lastRun, formatDuration }) => (
  <Card
    variant="outlined"
    sx={{
      height: 500,
      borderRadius: 2,
      boxShadow: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
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
        style={{ height: "140px", width: "100%", borderRadius: "8px" }}
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
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography>Name: {lastRun?.name || "Loading..."}</Typography>
        <Typography>Date: {lastRun ? lastRun.date : "Loading..."}</Typography>
        <Typography>
          Distance: {lastRun ? lastRun.distance : "Loading..."} km
        </Typography>
        <Typography>
          Duration:{" "}
          {lastRun?.moving_time ? formatDuration(lastRun.moving_time) : "N/A"}
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
);

LastRunData.propTypes = {
  mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired,
  lastRun: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    distance: PropTypes.number,
    moving_time: PropTypes.string,
  }).isRequired,
  formatDuration: PropTypes.func.isRequired,
};

export default LastRunData;
