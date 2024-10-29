import { useEffect, useState } from "react";
import axios from "axios";

const AllShoes = () => {
  const [shoes, setShoes] = useState([]);

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

  return (
    <div>
      <h1>Shoe List</h1>
      {shoes.map((shoe) => (
        <div key={shoe.id}>
          <img src={shoe.imageUrl} alt={shoe.name} width="200" />
          <h2>{shoe.name}</h2>
          <p>Year Released: {shoe.yearReleased}</p>
        </div>
      ))}
    </div>
  );
};

export default AllShoes;
