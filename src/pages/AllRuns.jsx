import { useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { useFetchRuns } from "../hooks/useFetchRuns";
import RunCard from "../components/RunCard";
import PaginationControls from "../components/PaginationControls";

export default function AllRuns() {
  const [currentPage, setCurrentPage] = useState(1);
  const { runs, loading, error, totalRuns, runsPerPage } =
    useFetchRuns(currentPage);
  const totalPages = Math.ceil(totalRuns / runsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Your Runs
      </Typography>
      {runs.length > 0 ? (
        <Grid container spacing={2}>
          {runs.map((run) => (
            <Grid item xs={12} sm={6} md={4} key={run.id}>
              <RunCard run={run} formatDuration={formatDuration} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No runs available.</Typography>
      )}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </Box>
  );
}
