import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uniqueid } from 'uuid';
uniqueid();

function App() {
  const [originaldata, setoriginaldata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [search,setsearch] = useState('');
  
  let id = null;



const  handlesearch =(term,debounce)=>{
  console.log(term);
  if(!id){
    clearTimeout(id);
  }

  id = setTimeout(()=>{
    const handelelist = originaldata
    .filter((item) => 
      item.name.common.toLowerCase().includes(term.toLowerCase())
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));
      console.log(handelelist);
      setfilterdata(handelelist);
  })
   

}


  const performAPiIntitialrendering = async () => {
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/all`);
      console.log(res.data);
      setoriginaldata(res.data);
      setfilterdata(res.data);
    } catch (e) {
      console.error("Error while fetching data", e.message);
      if (e.status) {
        console.error("Error while fetching data", e.message);
      }
    }
  };

  useEffect(() => {
    const loader = async () => {
      await performAPiIntitialrendering();
    };
    loader();
  }, []);
  useEffect(()=>{
    handlesearch(search,300);
  },[search])

  return (
    <div className="App">
      <input
        placeholder="Search for counteries"
        type="text"
        className="textbox"
        onChange={(e) => {
          setsearch(e.target.value) 
         
        }}
      />
      <div className="countries-list">
        {filterdata.length>0?(
          filterdata.map((item,index)=>(
            <div className="countryCard" key={index}>
            <img
              src={item.flags.png}
              alt={item.name.official}
              style={{ objectFit: "cover", height: "150px" }}
            />
            <h3>{item.name.common}</h3>
          </div>
          ))
        ):null}
      </div>
    </div>
  );
}

export default App;
