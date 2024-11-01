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
      try {
        const url = import.meta.env.VITE_RUNS_URL;
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get("data");

        if (data) {
          const parsedData = JSON.parse(decodeURIComponent(data));
          const accessToken = parsedData.accessToken;

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
          }
          console.log("accessTOken", accessToken);
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          setState({
            shoeStats: parsedData.gear,
            lastRun: {
              ...parsedData.lastRun,
              distance: parseFloat(parsedData.lastRun.distance),
            },
            totalKilometersLastWeek: response.data.totalKilometersLastWeek,
            totalKilometersCurrentWeek:
              response.data.totalKilometersCurrentWeek,
            loading: false,
          });
        } else {
          window.location.href = import.meta.env.VITE_STRAVA_AUTH_URL;
        }
      } catch (error) {
        console.error("Error fetching run data:", error);
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchData();
  }, []);

  return state;
}
