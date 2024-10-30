import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchRunData() {
  const [state, setState] = useState({
    shoeStats: null,
    lastRun: null,
    totalKilometersLastWeek: 0,
    totalKilometersCurrentWeek: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const data = urlParams.get("data");

      if (data) {
        const parsedData = JSON.parse(decodeURIComponent(data));

        if (parsedData.accessToken) {
          localStorage.setItem("accessToken", parsedData.accessToken);
        }

        const accessToken = parsedData.accessToken;
        const response = await axios.get("http://localhost:5000/api/runs", {
          headers: { Authorization: accessToken },
        });

        setState((prevState) => ({
          ...prevState,
          shoeStats: parsedData.gear,
          lastRun: parsedData.lastRun,
          totalKilometersLastWeek: response.data.totalKilometersLastWeek,
          totalKilometersCurrentWeek: response.data.totalKilometersCurrentWeek,
          loading: false,
        }));
      } else {
        window.location.href = `http://localhost:5000/auth/strava`;
      }
    };

    fetchData();
  }, []);

  return state;
}
