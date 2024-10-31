import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";

const RunCard = ({ run, formatDuration }) => (
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
      <Typography>Duration: {formatDuration(run.moving_time)}</Typography>
    </CardContent>
  </Card>
);

RunCard.propTypes = {
  run: PropTypes.shape({
    name: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    moving_time: PropTypes.number.isRequired,
  }).isRequired,
  formatDuration: PropTypes.func.isRequired,
};

export default RunCard;
