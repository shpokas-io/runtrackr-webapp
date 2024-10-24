import { useEffect, useState } from "react";
import { Typography, Box, Button, Pagination } from "@mui/material";
import axios from "axios";

export default function AllShoes() {
  //State
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const runsPerPage = 10;

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/strava");
        setRuns(response.data);
      } catch (error) {
        console.error("Error fetching runs data");
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, []);
  if (loading) return <div>Loading...</div>;

  //Calculate runs to display based on current page
  const indexOfLastRun = currentPage * runsPerPage;
  const indexOfFirstRun = indexOfLastRun - runsPerPage;
  const currentRuns = runs.slice(indexOfFirstRun, indexOfLastRun);
  const totalPages = Math.ceil(runs.length / runsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">All Runs</Typography>
      <Box>
        {currentRuns.map((run, index) => (
          <Box key={index} sx={{ mb: 2, border: "1px solid grey", p: 2 }}>
            <Typography>Name: {run.name}</Typography>
            <Typography>Date: {run.date}</Typography>
            <Typography>Distance: {run.distance} km</Typography>
            <Typography>Duration: {run.moving_time}</Typography>
          </Box>
        ))}
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        variant="outlined"
        color="primary"
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
