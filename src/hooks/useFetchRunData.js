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

  const isDemoMode = true; //Demo mode on/off

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isDemoMode) {
          const response = await axios.get(
            "http://localhost:5000/api/demo-runs"
          );
          setState({
            shoeStats: response.data.gear,
            lastRun: {
              ...response.data.lastRun,
              distance: parseFloat(response.data.lastRun.distance),
            },
            totalKilometersLastWeek: response.data.totalKilometersLastWeek,
            totalKilometersCurrentWeek:
              response.data.totalKilometersCurrentWeek,
            loading: false,
          });
        } else {
          const urlParams = new URLSearchParams(window.location.search);
          const data = urlParams.get("data");

          if (data) {
            const parsedData = JSON.parse(decodeURIComponent(data));
            const accessToken = parsedData.accessToken;

            if (accessToken) {
              localStorage.setItem("accessToken", accessToken);
            }

            const response = await axios.get("http://localhost:5000/api/runs", {
              headers: { Authorization: accessToken },
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
            window.location.href = `http://localhost:5000/auth/strava`;
          }
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
