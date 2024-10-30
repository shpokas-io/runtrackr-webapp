import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const ShoeStatistics = ({ shoeStats, shoeImage }) => (
  <Card
    variant="outlined"
    sx={{
      borderRadius: 2,
      boxShadow: 3,
      flex: 1,
      display: "flex",
      flexDirection: "column",
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
        Shoe Statistics
      </Typography>
      <CardMedia
        component="img"
        height="140"
        image={shoeImage}
        alt="Running Shoes"
        sx={{ objectFit: "contain", p: 1, alignSelf: "center" }}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography>{shoeStats?.name || `Loading...`}</Typography>
        <Typography>
          Total mileage: {shoeStats ? shoeStats.totalMileage : "Loading..."} km
          of {shoeStats ? shoeStats.maxMileage : "Loading..."} km
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => (window.location.href = "/all-shoes")}
      >
        See All Shoes
      </Button>
    </CardContent>
  </Card>
);

ShoeStatistics.propTypes = {
  shoeStats: PropTypes.shape({
    name: PropTypes.string,
    totalMileage: PropTypes.number,
    maxMileage: PropTypes.number,
  }).isRequired,
  shoeImage: PropTypes.string.isRequired,
};

export default ShoeStatistics;
