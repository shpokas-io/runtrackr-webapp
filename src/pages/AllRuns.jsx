import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  CardContent,
  Button,
  Card,
  Grid,
} from "@mui/material";

export default function AllRuns() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRuns, setTotalRuns] = useState(0);
  const runsPerPage = 5; // Number of runs per page

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
        const response = await axios.get(
          `http://localhost:5000/api/runs?page=${currentPage}`,
          {
            headers: { Authorization: accessToken },
          }
        );
        setRuns(response.data.runs);
        setTotalRuns(response.data.total); // Get total runs for paginatiopn
      } catch (err) {
        console.error("Error fetching runs:", err);
        setError("Error fetching runs");
      } finally {
        setLoading(false); // Ensuring loading state is updated regardless of success or error
      }
    };

    fetchRuns();
  }, [currentPage]); //RE-fetch runs whenever currentPage changes

  const totalPages = Math.ceil(totalRuns / runsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Function to format duration from seconds to hours and minutes
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

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
                    Date: {new Date(run.start_date).toLocaleDateString()}
                  </Typography>
                  <Typography>Distance: {run.distance / 1000} km</Typography>
                  <Typography>
                    Duration: {formatDuration(run.moving_time)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No runs available.</Typography>
      )}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography>{`Page ${currentPage} of ${totalPages}`}</Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
