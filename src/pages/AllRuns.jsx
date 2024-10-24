import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";

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
        setLoading(false); // Ensure loading state is updated regardless of success or error
      }
    };

    fetchRuns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">All Your Runs</Typography>
      {runs.length > 0 ? (
        runs.map((run) => (
          <Box
            key={run.id}
            sx={{
              mb: 2,
              p: 2,
              border: 1,
              borderColor: "grey.400",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">{run.name}</Typography>
            <Typography>Distance: {run.distance} km</Typography>
            <Typography>
              Date: {new Date(run.date).toLocaleDateString()}{" "}
              {/* Format date */}
            </Typography>
            <Typography>Duration: {run.moving_time} seconds</Typography>
          </Box>
        ))
      ) : (
        <Typography>No runs available.</Typography>
      )}
    </Box>
  );
}
