import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchRuns = (currentPage) => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRuns, setTotalRuns] = useState(0);
  const runsPerPage = 5;

  useEffect(() => {
    const fetchRuns = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("Access token is missing. Please re-authenticate.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/runs?page=${currentPage}`,
          { headers: { Authorization: accessToken } }
        );
        setRuns(response.data.runs);
        setTotalRuns(response.data.total);
      } catch (err) {
        console.error("Error fetching runs:", err);
        setError("Error fetching runs");
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, [currentPage]);

  return { runs, loading, error, totalRuns, runsPerPage };
};
