import { useState, useEffect } from "react";
import "./App.css";
import CountryCard from "./components/card/CountryCard";

function App() {
  // is useState as an empty array good?
  const [countries, setCountries] = useState([]);
  // API call!
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const jsonData = await response.json();
        setCountries(jsonData);
        console.log(countries);
      } catch (error) {
        console.error("error fetching data from restcountries.com", error);
      }
    };
    fetchCountryData();
  }, []);

  return (
    <>
      <CountryCard />
    </>
  );
}

export default App;
