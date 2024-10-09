import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uniqueid } from "uuid";

function App() {
  const [countries, setCountries] = useState([]); // Combined state for all countries
  const [searchTerm, setSearchTerm] = useState("");
  // const timeoutRef = useRef(null);
  const [originalData, setOriginalData] = useState([]);

  const handleSearch = (term, debounce = 300) => {
    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    // }

    // timeoutRef.current = setTimeout(() => {
      if (term === "") {
        setCountries(originalData); 
      } else {
        const filteredCountries = originalData.filter((country) =>
          country.name.common.toLowerCase().includes(term.toLowerCase())
        );
        setCountries(filteredCountries);
      }
    // }, debounce);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      console.log("Fetched data:", response.data); // Log fetched data for debugging
      setCountries(response.data);
      setOriginalData(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);

    // return () => clearTimeout(timeoutRef.current); 
  }, [searchTerm]);

  return (
    <div className="App">
      <input
        placeholder="Search for countries"
        type="text"
        className="textbox"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="countries-list">
        {countries.length > 0 ? (
          countries.map((country) => (
            <div className="countryCard" key={uniqueid()}>
              <img
                src={country.flags.svg}
                alt={country.name.official}
                style={{ objectFit: "cover", height: 100, width: 100, padding: "1rem" }}
              />
              <h2>{country.name.common}</h2>
            </div>
          ))
        ) : (
         null
        )}
      </div>
    </div>
  );
}

export default App;