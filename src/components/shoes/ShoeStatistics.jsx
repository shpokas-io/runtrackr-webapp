import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const ShoeStatistics = ({ shoeStats, shoeImage }) => {
  const maxMileage = shoeStats?.maxMileage ?? 1000;
  const totalMileage = parseFloat(shoeStats?.totalMileage) || 0;
  const mileagePercentage = Math.min((totalMileage / maxMileage) * 100, 100);

  return (
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
          Shoe Statistics
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image={shoeImage}
          alt="Running Shoes"
          sx={{ objectFit: "contain", p: 1, borderRadius: "8px" }}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            mt: 2,
          }}
        >
          <Typography>{shoeStats?.name || `Loading...`}</Typography>
          <Typography>
            Total mileage: {totalMileage.toFixed(2)} km
            <br />
            Max mileage: {maxMileage} km
          </Typography>

          <Box
            sx={{
              mt: 2,
              position: "relative",
              height: 10,
              width: "100%",
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${mileagePercentage}%`,
                transition: "width 0.3s ease-in-out",
                background: `linear-gradient(to right, green, yellow, orange, red)`,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "-2px",
                left: `calc(${mileagePercentage}% - 8px)`,
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "black",
                border: "2px solid white",
                transition: "left 0.3s ease-in-out",
              }}
            />
          </Box>
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
};

ShoeStatistics.propTypes = {
  shoeStats: PropTypes.shape({
    name: PropTypes.string,
    totalMileage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxMileage: PropTypes.number,
  }).isRequired,
  shoeImage: PropTypes.string.isRequired,
};

export default ShoeStatistics;
