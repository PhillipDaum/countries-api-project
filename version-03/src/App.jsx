import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SavedCountries from "./pages/SavedCountries";
import CountryPage from "./pages/CountryPage";
import { Box } from "@chakra-ui/react";
import countriesData from "../data.js";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import LoginPage from "./pages/LoginPage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH0eF3LnQhXX62jdRlHZMkMmE0Yc9BljM",
  authDomain: "countries-api-6f83d.firebaseapp.com",
  databaseURL: "https://countries-api-6f83d-default-rtdb.firebaseio.com",
  projectId: "countries-api-6f83d",
  storageBucket: "countries-api-6f83d.firebasestorage.app",
  messagingSenderId: "513877725077",
  appId: "1:513877725077:web:1cb596c7f1452df014709c",
  measurementId: "G-2XE45XWPBE",
};

function App() {
  const [countries, setCountries] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app)
  // Checks authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        console.log("user signed in", user.email);
      } else {
        setIsSignedIn(false);
        console.log("user is signed out");
      }
    });
    // cleanup function to prevent memory leaks
    // ask teachers about this
    return () => unsubscribe();
  }, [auth])
  // Sign out
  const signOutUser = async () => {
    try {
      // should I use variable? does it matter
      await signOut(auth);
      // add alert or pop up or something? 
      console.log("they done signed out")
    } catch(error) {
      console.error(error)
    }
  }

  // Countries API call
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
      setCountries(countriesData);
    }
  };
  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <>
      <Header isSignedIn={isSignedIn} signOutUser={signOutUser} />
      <Box bg="bg.muted" height="vh">
        <Routes>
          <Route path="/" element={<HomePage countries={countries} database={database} />} />
          <Route
            path="/saved-countries"
            element={<SavedCountries countries={countries} database={database} auth={auth} onAuthStateChanged={onAuthStateChanged}/>}
          />
          <Route path="/login" element={<LoginPage auth={auth}/>}/>
          <Route
            path="/country-page/:oneCountry"
            element={<CountryPage countries={countries} database={database} auth={auth}/>}
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
