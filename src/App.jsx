import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./pages/home-page/HomePage";
import SavedCountries from "./pages/saved-countries/SavedCountries";
import CountryPage from "./pages/country-page/CountryPage";


function App() {
  // is useState as an empty array good?
  const [countries, setCountries] = useState([]);
  const [userSavedCountries, setUserSavedCountries] = useState([])

  // API call
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
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
          <Route path="/saved-countries" element={<SavedCountries userSavedCountries={userSavedCountries}/>} />
          {/* use react router methods to grab that value from the url */}
          <Route path="/country-page/:oneCountry" element={<CountryPage countries={countries} setUserSavedCountries={setUserSavedCountries}/>} />
        </Routes>
    </>
  );
}

export default App;
