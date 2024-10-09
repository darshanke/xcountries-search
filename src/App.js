// import logo from "./logo.svg";
// import "./App.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { v4 as uniqueid } from "uuid";
// uniqueid();

// function App() {
//   const [originaldata, setoriginaldata] = useState([]);
//   const [filterdata, setfilterdata] = useState([]);
//   const [search, setsearch] = useState(null);

//   let id = null;

//   const handlesearch = (term, debounce) => {
//     console.log(term);
//     if (!id) {
//       clearTimeout(id);
//     }

//     id = setTimeout(() => {
//       const handelelist = originaldata
//         .filter((item) =>
//           item.name.common.toLowerCase().includes(term.toLowerCase())
//         )
        
//       console.log(handelelist);
//       setfilterdata(handelelist);
//     }, debounce);
//   };

//   const performAPiIntitialrendering = async () => {
//     try {
//       const res = await axios.get(`https://restcountries.com/v3.1/all`);
//       console.log(res.data);
//       setoriginaldata(res.data);
//       setfilterdata(res.data);
//     } catch (e) {
//       console.error("Error while fetching data", e.message);
//       if (e.status) {
//         console.error("Error while fetching data", e.message);
//       }
//     }
//   };

//   useEffect(() => {
//     const loader = async () => {
//       await performAPiIntitialrendering();
//     };
//     loader();
//   }, []);
//   useEffect(() => {
//     handlesearch(search, 300);
//   }, [search]);

//   return (
//     <div className="App">
//       <input
//         placeholder="Search for counteries"
//         type="text"
//         className="textbox"
//         onChange={(e) => {
//           setsearch(e.target.value);
//         }}
//       />
//       <div className="countries-list">
//         {filterdata.length > 0
//           ? filterdata.map((item, index) => (
//               <div className="countryCard" key={index}>
//                 <img
//                   src={item.flags.png}
//                   alt={item.name.official}
//                   style={{ objectFit: "cover", height: "150px" }}
//                 />
//                 <h3>{item.name.common}</h3>
//               </div>
//             ))
//           : null}
//       </div>
//     </div>
//   );
// }

// export default App;
import logo from "./logo.svg";
// import "./App.css";
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { v4 as uniqueid } from "uuid";

// function App() {
//   const [originaldata, setoriginaldata] = useState([]);
//   const [filterdata, setfilterdata] = useState([]);
//   const [search, setsearch] = useState("");
//   const timeoutRef = useRef(null);

//   const handlesearch = (term, debounce) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     timeoutRef.current = setTimeout(() => {
//       if (term === "") {
//         setfilterdata(originaldata); // Show all countries when search is empty
//       } else {
//         const handelelist = originaldata.filter((item) =>
//           item.name.common.toLowerCase().includes(term.toLowerCase())
//         );
//         setfilterdata(handelelist);
//       }
//     }, debounce);
//   };

//   const performAPiIntitialrendering = async () => {
//     try {
//       const res = await axios.get(`https://restcountries.com/v3.1/all`);
//       console.log("API Response:", res.data);
//       setoriginaldata(res.data);
//       setfilterdata(res.data); // Set initial filterdata to all countries
//     } catch (e) {
//       console.error("Error while fetching data", e.message);
//     }
//   };

//   useEffect(() => {
//     performAPiIntitialrendering();
//   }, []);

//   useEffect(() => {
//     handlesearch(search, 300);
//     return () => {
//       clearTimeout(timeoutRef.current); // Cleanup timeout on unmount
//     };
//   }, [search,originaldata]);

//   return (
//     <div className="App">
//       <input
//         placeholder="Search for countries"
//         type="text"
//         className="textbox"
//         value={search}
//         onChange={(e) => setsearch(e.target.value)}
//       />
//       <div className="countries-list">
//         {filterdata.length > 0
//           ? filterdata.map((item) => (
//               <div className="countryCard" key={uniqueid()}>
//                 <img
//                   src={item.flags.png}
//                   alt={item.name.official}
//                   style={{ objectFit: "cover", height: "100px", width: "100px" , padding: "1rem "}}
//                 />
//                 <h3>{item.name.common}</h3>
//               </div>
//             ))
//           : null}
//       </div>
//     </div>
//   );
// }

// export default App;



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