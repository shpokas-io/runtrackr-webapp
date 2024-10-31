import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

const WeeklyStatistics = ({
  totalKilometersLastWeek,
  totalKilometersCurrentWeek,
}) => (
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
);

WeeklyStatistics.propTypes = {
  totalKilometersLastWeek: PropTypes.number.isRequired,
  totalKilometersCurrentWeek: PropTypes.number.isRequired,
};

export default WeeklyStatistics;
