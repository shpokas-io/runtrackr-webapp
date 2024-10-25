import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, CardContent, Card, Grid } from "@mui/material";

export default function AllRuns() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRuns = async () => {
      // Retrieve access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("Access token is missing. Please re-authenticate.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/runs", {
          headers: { Authorization: accessToken },
        });
        setRuns(response.data);
      } catch (err) {
        console.error("Error fetching runs:", err);
        setError("Error fetching runs");
      } finally {
        setLoading(false); // Ensuring loading state is updated regardless of success or error
      }
    };

    fetchRuns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Your Runs
      </Typography>
      {runs.length > 0 ? (
        <Grid container spacing={2}>
          {runs.map((run) => (
            <Grid item xs={12} sm={6} md={4} key={run.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {run.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Date: {new Date(run.date).toLocaleDateString()}
                  </Typography>
                  <Typography>Distance: {run.distance} km</Typography>
                  <Typography>Duration: {run.moving_time} seconds</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No runs available.</Typography>
      )}
    </Box>
  );
}
