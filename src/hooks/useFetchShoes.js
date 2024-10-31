import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SHOES_API_URL);
        console.log("Shoe data:", response.data);
        setShoes(response.data);
      } catch (error) {
        console.error("Error fetching shoes:", error);
        setError(error);
      }
    };

    fetchShoes();
  }, []);

  return { shoes, error };
};
