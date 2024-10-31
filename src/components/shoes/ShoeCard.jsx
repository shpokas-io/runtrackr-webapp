import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ShoeCard = ({ shoe }) => (
  <Card
    sx={{
      width: 300,
      height: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: 3,
      mx: "auto",
    }}
  >
    <CardMedia
      component="img"
      image={shoe.imageUrl}
      alt={shoe.name}
      sx={{ width: "100%", height: 140, objectFit: "cover" }}
    />
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h5" component="div" align="center">
        {shoe.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Year Released: {shoe.yearReleased}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Price: ${shoe.price}
      </Typography>
    </CardContent>
  </Card>
);

ShoeCard.propTypes = {
  shoe: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    yearReleased: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ShoeCard;
