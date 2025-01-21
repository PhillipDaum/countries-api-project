import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SavedCountries from "./pages/SavedCountries";
import CountryPage from "./pages/CountryPage";
import { Box } from "@chakra-ui/react";
import countriesData from '../data.js'

// Saved Country page is a little janky

function App() {
  // Global variables
  const [countries, setCountries] = useState([]);
  // issue with this not being null and the conditional rendering on the saved countries page
  const [userSavedCountries, setUserSavedCountries] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  // API call
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // sorted alphabetically by common name
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
      } catch (error) {
        console.error("error fetching data from restcountries.com", error);
        setCountries(countriesData)
      }
    };
    fetchCountryData();
  }, []);

  return (
    <>
      <Header />
      <Box bg="bg.muted" height="vh">
      <Routes>
        <Route path="/" element={<HomePage countries={countries} />} />
        <Route
          path="/saved-countries"
          element={<SavedCountries userSavedCountries={userSavedCountries} setUserProfile={setUserProfile} userProfile={userProfile}/>}
        />
        <Route
          path="/country-page/:oneCountry"
          element={
            <CountryPage
              countries={countries}
              setUserSavedCountries={setUserSavedCountries}
            />
          }
        />
      </Routes>
      </Box>
    </>
  );
}

export default App;
