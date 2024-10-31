import { useState } from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
import ShoeCard from "../components/ShoeCard";
import { useFetchShoes } from "../hooks/useFetchShoes";

const AllShoes = () => {
  const { shoes, error } = useFetchShoes();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastShoe = currentPage * itemsPerPage;
  const indexOfFirstShoe = indexOfLastShoe - itemsPerPage;
  const currentShoes = shoes.slice(indexOfFirstShoe, indexOfLastShoe);
  const totalPages = Math.ceil(shoes.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (error) {
    return (
      <Typography color="error">
        Error loading shoes: {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Shoe List
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {currentShoes.map((shoe) => (
          <Grid item key={shoe.id} xs={12} sm={6} md={4} lg={3}>
            <ShoeCard shoe={shoe} />
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
