import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./pages/home-page/HomePage";
import SavedCountries from "./pages/saved-countries/SavedCountries";


function App() {
  // is useState as an empty array good?
  const [countries, setCountries] = useState([]);

  // filtered countries

  // saved countries

  const handleChange = (e) => {

  }

  const handleSubmit = (e) => {
    
  }

  // API call
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const jsonData = await response.json();
        setCountries(jsonData);
        // console.log(countries);
      } catch (error) {
        console.error("error fetching data from restcountries.com", error);
      }
    };
    fetchCountryData();
  }, []);

  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage countries={countries} />} />
          <Route path="/saved-countries" element={<SavedCountries />} />
        </Routes>
    </>
  );
}

export default App;
