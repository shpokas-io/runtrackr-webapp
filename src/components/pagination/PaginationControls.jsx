import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => (
  <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
    <Button
      variant="contained"
      onClick={onPrevPage}
      disabled={currentPage === 1}
    >
      Previous
    </Button>
    <Typography>{`Page ${currentPage} of ${totalPages}`}</Typography>
    <Button
      variant="contained"
      onClick={onNextPage}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </Box>
);

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};

export default PaginationControls;
