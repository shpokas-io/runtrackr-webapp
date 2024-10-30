import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Pagination,
} from "@mui/material";

const AllShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch the hardcoded shoe list from the backend
    axios
      .get("http://localhost:5000/api/shoes")
      .then((response) => {
        console.log("Shoe data:", response.data);
        setShoes(response.data);
      })
      .catch((error) => console.error("Error fetching shoes:", error));
  }, []);

  const indexOfLastShoe = currentPage * itemsPerPage;
  const indexOfFirstShoe = indexOfLastShoe - itemsPerPage;
  const currentShoes = shoes.slice(indexOfFirstShoe, indexOfLastShoe);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(shoes.length / itemsPerPage);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Shoe List
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {currentShoes.map((shoe) => (
          <Grid item key={shoe.id} xs={12} sm={6} md={4} lg={3}>
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
                sx={{ width: "100%", height: 200, objectFit: "cover" }} // Consistent image size
              />
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  {shoe.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Year Released: {shoe.yearReleased}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Price: ${shoe.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default AllShoes;
